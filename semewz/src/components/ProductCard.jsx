import { ShoppingBag, Heart } from 'lucide-react'
import { useState } from 'react'

export default function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[2] || '')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (selectedSize) {
      console.log(`Added ${product.name} in size ${selectedSize} to cart`)
      // Add cart logic here
    }
  }

  return (
    <div className="group product-card">
      {/* Image Container */}
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=500&fit=crop'
          }}
        />

        {/* Quick Actions - Shown on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end justify-center opacity-0 group-hover:opacity-100 p-4 backdrop-blur-sm">
          <div className="flex gap-3 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className="flex-1 button button-primary text-sm flex items-center justify-center gap-2 disabled:opacity-50 hover:shadow-xl transform hover:scale-105"
            >
              <ShoppingBag size={16} />
              Add to Bag
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="button border-2 border-white text-white hover:bg-white hover:text-black px-4 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Heart size={16} fill={isWishlisted ? 'white' : 'none'} className="transition-all duration-300" />
            </button>
          </div>
        </div>

        {/* New Badge */}
        {product.category === 'new' && (
          <div className="absolute top-4 left-4 bg-semwz-black text-white px-3 py-1 text-xs font-semibold tracking-wide rounded-lg">
            NEW
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 lg:p-6">
        <h3 className="text-sm lg:text-base font-semibold text-semwz-black mb-1 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-xs text-gray-600 mb-3">
          {product.color}
        </p>

        {/* Price */}
        <p className="text-lg font-bold text-semwz-black mb-4">
          ₹{product.price.toLocaleString()}
        </p>

        {/* Size Selector */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-700 block mb-2">
            Size
          </label>
          <div className="grid grid-cols-4 lg:grid-cols-5 gap-2">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`h-8 text-xs font-medium rounded border transition-all ${
                  selectedSize === size
                    ? 'bg-semwz-black text-white border-semwz-black'
                    : 'bg-white text-semwz-black border-gray-300 hover:border-semwz-black'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2">
          {product.description}
        </p>
      </div>
    </div>
  )
}
