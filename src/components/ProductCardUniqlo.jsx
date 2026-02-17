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
    <div className="group bg-white/90 rounded-sm h-full flex flex-col border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-300">
      {/* Product Image Container - Large & Prominent */}
      <div className="relative overflow-hidden bg-gray-50 aspect-square mb-3">
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
        <p className="text-xs font-semibold text-gray-800 mb-0.5 line-clamp-2 leading-tight">
          {product.name}
        </p>

        {/* Size & Category Info */}
        <p className="text-[9px] text-gray-500 mb-1">
          Unisex, {product.sizes.join('-')}
        </p>

        {/* Color Swatches - Make them visible */}
        {variants && variants.length > 0 && (
          <div className="flex items-center gap-1 mb-1.5">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedColor(variant.color)}
                className={`w-4 h-4 rounded-full border-2 transition-all cursor-pointer ${
                  selectedColor === variant.color
                    ? 'border-gray-900 ring-2 ring-offset-1 ring-semwz-peach'
                    : 'border-gray-300 hover:border-gray-500'
                }`}
                style={{ backgroundColor: variant.colorHex }}
                title={variant.color}
              />
            ))}
          </div>
        )}

        {/* Price Section */}
        <div className="mb-1 flex items-baseline gap-1">
          <span className="text-sm font-bold text-gray-900">
            Rs. {product.price.toLocaleString()}
          </span>
        </div>

        {/* Sale Badge */}
        {isSale && (
          <p className="text-[9px] font-bold text-red-600 mb-1">
            Sale
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-0.5 mb-1.5">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-[10px]">★</span>
            ))}
          </div>
          <span className="text-[9px] text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Size Selector */}
        <div className="mb-2">
          <label className="text-[9px] font-semibold text-gray-700 block mb-0.5">
            Size
          </label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full h-6 text-[9px] font-medium border border-gray-300 rounded px-1.5 bg-white hover:border-gray-400 focus:outline-none focus:border-gray-900"
          >
            <option value="">Select</option>
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Add to Bag Button */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className={`w-full py-1 rounded-none text-[10px] font-semibold transition-all ${
            addedToCart
              ? 'bg-green-500 text-white'
              : 'bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed'
          }`}
        >
          {addedToCart ? '✓ Added' : 'Add to Bag'}
        </button>
      </div>
    </div>
  )
}
