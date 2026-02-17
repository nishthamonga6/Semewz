import { ArrowRight } from 'lucide-react'

export default function EditorialSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#F2D3C5]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Decorative top element */}
        <div className="flex justify-center mb-12">
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-semwz-black to-transparent"></div>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Large Feature Card */}
          <div className="lg:col-span-2 relative h-[420px] rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
            <img 
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop"
              alt="Spring Collection"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-8">
              <div className="mb-4">
                <div className="w-8 h-1 bg-white mb-4"></div>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
                Spring Essentials
              </h3>
              <p className="text-white/85 text-base mb-6 leading-relaxed max-w-md">
                Refresh your wardrobe with our curated spring collection
              </p>
              <button className="button button-primary w-fit inline-flex items-center gap-2 hover:gap-3 transition-all duration-300">
                Explore Collection
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Vertical Cards */}
          <div className="flex flex-col gap-8">
            <div className="relative h-[206px] rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 border border-gray-200/50 hover:border-gray-300/80">
              <img 
                src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=400&fit=crop"
                alt="Denim Focus"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <div className="mb-2">
                  <div className="w-6 h-0.5 bg-white/60 group-hover:bg-white transition-colors duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Denim
                </h3>
              </div>
            </div>

            <div className="relative h-[206px] rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 border border-gray-200/50 hover:border-gray-300/80">
              <img 
                src="https://images.unsplash.com/photo-1502716413656-97b41294e493?w=400&h=400&fit=crop"
                alt="New Arrivals"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <div className="mb-2">
                  <div className="w-6 h-0.5 bg-white/60 group-hover:bg-white transition-colors duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-white">
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
