import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from './ProductCard'

export default function Wishlist() {
  const { wishlistItems } = useWishlist()

  return (
    <div className="min-h-screen bg-semwz-peach">
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-semwz-black mb-2">Your Wishlist</h1>
          <p className="text-semwz-black/60">Items you&apos;ve saved for later</p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="product-grid grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl shadow-sm">
            <Heart size={48} className="text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-semwz-black mb-2">No items yet</h2>
            <p className="text-semwz-black/60 mb-8 text-center max-w-sm">
              Start adding your favorite items by clicking the heart on any product.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-semwz-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-semwz-black/90 transition"
            >
              <ShoppingBag size={18} />
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
