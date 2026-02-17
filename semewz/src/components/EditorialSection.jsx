import { ArrowRight } from 'lucide-react'

export default function EditorialSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="section-heading text-semwz-black mb-3">
            The Edit
          </h2>
          <p className="section-subtitle">
            Carefully curated pieces for your lifestyle
          </p>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large Feature Card */}
          <div className="lg:col-span-2 relative h-[400px] rounded-lg overflow-hidden group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop"
              alt="Spring Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Spring Essentials
              </h3>
              <p className="text-white/80 text-sm mb-4">
                Refresh your wardrobe with our curated spring collection
              </p>
              <button className="button button-primary w-fit inline-flex items-center gap-2">
                Explore
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Vertical Cards */}
          <div className="flex flex-col gap-6">
            <div className="relative h-[190px] rounded-lg overflow-hidden group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=400&fit=crop"
                alt="Denim Focus"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4">
                <h3 className="text-lg font-bold text-white">
                  Jeans
                </h3>
              </div>
            </div>

            <div className="relative h-[190px] rounded-lg overflow-hidden group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1502716413656-97b41294e493?w=400&h=400&fit=crop"
                alt="New Arrivals"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4">
                <h3 className="text-lg font-bold text-white">
                  This Week's New
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
