import { memo } from 'react'

function ProductCard({ product }) {
  return (
    <div className="group product-card">
      {/* Image Container */}
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=500&fit=crop'
          }}
        />

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

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2">
          {product.description}
        </p>
      </div>
    </div>
  )
}

export default memo(ProductCard)
