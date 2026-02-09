import { Heart } from 'lucide-react'

export default function Wishlist() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading text-semwz-black mb-3">
            Your Wishlist
          </h2>
          <p className="section-subtitle">
            Items you've saved for later
          </p>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-24">
          <Heart size={48} className="text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No items yet
          </h3>
          <p className="text-gray-500 mb-8">
            Start adding your favorite items to your wishlist
          </p>
          <button className="button button-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    </section>
  )
}
