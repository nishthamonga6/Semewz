import React, { useState } from 'react'
import { X, Heart, ShoppingBag, Ruler } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const SIZE_CHART = [
  { size: 'XS', chest: '81-86', waist: '61-66', hip: '86-91', length: '64' },
  { size: 'S', chest: '86-91', waist: '66-71', hip: '91-96', length: '66' },
  { size: 'M', chest: '91-96', waist: '71-76', hip: '96-101', length: '68' },
  { size: 'L', chest: '96-101', waist: '76-81', hip: '101-106', length: '70' },
  { size: 'XL', chest: '101-106', waist: '81-86', hip: '106-111', length: '72' },
  { size: 'XXL', chest: '106-111', waist: '86-91', hip: '111-116', length: '74' },
]

export default function ProductDetailModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '')
  const [showSizeChart, setShowSizeChart] = useState(false)
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  if (!product) return null

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (selectedSize) {
      addToCart(product, selectedSize)
      onClose()
    }
  }

  const handleWishlist = (e) => {
    e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col lg:flex-row">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition"
          aria-label="Close"
        >
          <X size={20} className="text-semwz-black" />
        </button>

        {/* Image */}
        <div className="lg:w-1/2 aspect-[3/4] bg-gray-100 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&h=800&fit=crop'
            }}
          />
        </div>

        {/* Content */}
        <div className="lg:w-1/2 flex flex-col overflow-y-auto p-6 lg:p-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-semwz-black mb-1 pr-10">
            {product.name}
          </h2>
          <p className="text-semwz-black/60 text-sm mb-2">{product.color}</p>
          <p className="text-2xl font-bold text-semwz-black mb-4">
            ₹{product.price?.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 mb-6">{product.description}</p>

          {/* Size */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-semwz-black">Size</label>
              <button
                type="button"
                onClick={() => setShowSizeChart(!showSizeChart)}
                className="text-xs font-medium text-semwz-black/70 hover:text-semwz-black flex items-center gap-1"
              >
                <Ruler size={14} />
                Size chart
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(product.sizes || []).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[44px] py-2 px-3 text-sm font-medium rounded-lg border-2 transition ${
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

          {showSizeChart && (
            <div className="mb-6 overflow-x-auto">
              <table className="w-full text-xs border border-semwz-black/10 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-semwz-peach/30">
                    <th className="p-2 text-left font-semibold">Size</th>
                    <th className="p-2 text-left font-semibold">Chest (cm)</th>
                    <th className="p-2 text-left font-semibold">Waist (cm)</th>
                    <th className="p-2 text-left font-semibold">Hip (cm)</th>
                    <th className="p-2 text-left font-semibold">Length (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_CHART.filter(row => product.sizes?.includes(row.size)).map((row) => (
                    <tr key={row.size} className="border-t border-semwz-black/10">
                      <td className="p-2 font-medium">{row.size}</td>
                      <td className="p-2">{row.chest}</td>
                      <td className="p-2">{row.waist}</td>
                      <td className="p-2">{row.hip}</td>
                      <td className="p-2">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex gap-3 mt-auto pt-6">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className="flex-1 py-3 bg-semwz-black text-white font-semibold rounded-lg hover:bg-semwz-black/90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              Add to Bag
            </button>
            <button
              type="button"
              onClick={handleWishlist}
              className="py-3 px-5 border-2 border-semwz-black text-semwz-black font-semibold rounded-lg hover:bg-semwz-peach/30 transition-all duration-300 flex items-center justify-center"
              aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={20} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
