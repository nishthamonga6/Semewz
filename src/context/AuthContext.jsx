import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState(null)

  useEffect(() => {
    // Keep localStorage in sync with user state
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

  const signup = async (userData) => {
    setIsLoading(true)
    setAuthError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        const message = data?.message || 'Failed to create account'
        setAuthError(message)
        return { success: false, message }
      }

      // Save the created user from MongoDB (not changing on future logins)
      setUser(data.user)
      return { success: true, user: data.user }
    } catch (error) {
      const message = 'Unable to connect to server'
      setAuthError(message)
      return { success: false, message }
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (credentials) => {
    setIsLoading(true)
    setAuthError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        const message = data?.message || 'Login failed'
        setAuthError(message)
        return { success: false, message }
      }

      // Important: we just load the existing user from MongoDB.
      // Logging out and logging in again will NOT change their stored details.
      setUser(data.user)
      return { success: true, user: data.user }
    } catch (error) {
      const message = 'Unable to connect to server'
      setAuthError(message)
      return { success: false, message }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    // We only clear local state; MongoDB user record is not changed.
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, authError, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
