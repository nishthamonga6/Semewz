import { Heart } from 'lucide-react'
import { useState } from 'react'

export default function ProductCardUniqlo({ product, variants }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedColor, setSelectedColor] = useState(product.color)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '')
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    if (selectedSize) {
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const originalPrice = Math.round(product.price * 1.18)
  const isSale = product.stock === "Sale"

  return (
    <div className="group bg-white rounded-sm h-full flex flex-col border border-transparent hover:border-gray-200 transition-all duration-200">
      {/* Product Image Container - Large & Prominent */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=500&fit=crop'
          }}
        />

        {/* Wishlist Button - Top Right */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 bg-white/95 rounded-full p-1 shadow-sm hover:shadow-md transition-all hover:scale-110"
        >
          <Heart
            size={14}
            fill={isWishlisted ? '#E74C3C' : 'none'}
            stroke={isWishlisted ? '#E74C3C' : '#999'}
            className="transition-all"
          />
        </button>

        {/* Stock Badge */}
        {product.stock && (
          <div className="absolute bottom-2 left-2">
            <span className="text-[9px] font-semibold text-gray-600 bg-white/95 px-1.5 py-0.5 rounded">
              {product.stock}
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="px-2 pb-2 flex-grow flex flex-col">
        {/* Product Name */}
        <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 leading-tight">
          {product.name}
        </p>

        {/* Color Swatches - compact */}
        {variants && variants.length > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedColor(variant.color)}
                  className={`w-3 h-3 rounded-full border-2 transition-all cursor-pointer ${
                    selectedColor === variant.color
                      ? 'border-gray-900 ring-2 ring-offset-1 ring-semwz-peach'
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                  style={{ backgroundColor: variant.colorHex }}
                  title={variant.color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Price + Rating Row */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-gray-900">
            Rs. {product.price.toLocaleString()}
          </span>
          <span className="text-[10px] text-gray-600">{product.rating}★</span>
        </div>

        {/* Compact Add to Bag */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-1 rounded text-[11px] font-semibold transition-all ${
            addedToCart
              ? 'bg-green-500 text-white'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          {addedToCart ? '✓ Added' : 'Add to Bag'}
        </button>
      </div>
    </div>
  )
}
