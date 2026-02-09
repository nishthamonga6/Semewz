import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const signup = (userData) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setUser(userData)
      setIsLoading(false)
      localStorage.setItem('user', JSON.stringify(userData))
    }, 1000)
  }

  const login = (credentials) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: Math.random(),
        email: credentials.email,
        name: credentials.email.split('@')[0],
      }
      setUser(userData)
      setIsLoading(false)
      localStorage.setItem('user', JSON.stringify(userData))
    }, 1000)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signup, login, logout }}>
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
