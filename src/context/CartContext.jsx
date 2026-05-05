import { createContext, useContext, useState, useEffect } from 'react'

const CART_STORAGE_KEY = 'semewz_cart'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, size) => {
    const existingItem = cartItems.find(
      item => item.id === product.id && item.size === size
    )

    if (existingItem) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCartItems([...cartItems, { ...product, size, quantity: 1 }])
    }
  }

  const removeFromCart = (productId, size) => {
    setCartItems(
      cartItems.filter(item => !(item.id === productId && item.size === size))
    )
  }

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size)
      return
    }
    setCartItems(
      cartItems.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
