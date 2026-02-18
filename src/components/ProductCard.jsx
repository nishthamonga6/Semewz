import { ShoppingBag, Heart } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useProductDetail } from '../context/ProductDetailContext'

export default function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '')
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { openProduct } = useProductDetail()

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (selectedSize) {
      addToCart(product, selectedSize)
    }
  }

  const handleWishlistClick = (e) => {
    e.stopPropagation()
    toggleWishlist(product)
  }

  const handleCardClick = () => {
    openProduct(product)
  }

  const isWishlisted = isInWishlist(product.id)

  return (
    <div
      className="group product-card cursor-pointer"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      aria-label={`View ${product.name}`}
    >
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
              onClick={handleWishlistClick}
              className="button border-2 border-white text-white hover:bg-white hover:text-black px-4 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
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
      <div className="p-3 lg:p-4">
        <h3 className="text-sm lg:text-base font-semibold text-semwz-black mb-0.5 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-xs text-gray-600 mb-1.5">
          {product.color}
        </p>

        {/* Price */}
        <p className="text-base font-bold text-semwz-black mb-2">
          ₹{product.price.toLocaleString()}
        </p>

        {/* Size Selector */}
        <div className="mb-2">
          <label className="text-xs font-semibold text-gray-700 block mb-1">
            Size
          </label>
          <div className="grid grid-cols-4 lg:grid-cols-5 gap-1.5">
            {(product.sizes || []).map(size => (
              <button
                key={size}
                onClick={(e) => { e.stopPropagation(); setSelectedSize(size) }}
                className={`h-6 text-[11px] font-medium rounded border transition-all ${
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
