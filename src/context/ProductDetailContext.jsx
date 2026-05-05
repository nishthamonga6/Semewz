import { createContext, useContext, useState } from 'react'
import ProductDetailModal from '../components/ProductDetailModal'

const ProductDetailContext = createContext()

export function ProductDetailProvider({ children }) {
  const [product, setProduct] = useState(null)

  const openProduct = (p) => setProduct(p)
  const closeProduct = () => setProduct(null)

  return (
    <ProductDetailContext.Provider value={{ openProduct, closeProduct }}>
      {children}
      {product && (
        <ProductDetailModal
          product={product}
          onClose={closeProduct}
        />
      )}
    </ProductDetailContext.Provider>
  )
}

export function useProductDetail() {
  const context = useContext(ProductDetailContext)
  if (!context) throw new Error('useProductDetail must be used within ProductDetailProvider')
  return context
}
