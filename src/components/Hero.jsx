import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative h-[500px] lg:h-[700px] w-full overflow-hidden bg-semwz-black flex items-center justify-center group">
      {/* Background Image with Zoom Animation */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-10000 group-hover:scale-110"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=800&fit=crop)',
          backgroundPosition: 'center 30%'
        }}
      />
      
      {/* Animated Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent opacity-90" />

      {/* Content: left narrow text column + Carousel below */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="flex items-start gap-8">
          <div className="w-[320px] lg:w-[420px] text-white">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
              Elevate Your Style
            </h2>
            <p className="text-base lg:text-lg text-gray-300 mb-6 font-light">
              Discover curated collections designed for confident individuals who know exactly what they want.
            </p>
            <button className="button button-primary inline-flex items-center gap-2">
              Explore Collection
              <ArrowRight size={18} className="transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Animated Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-semwz-peach to-transparent rounded-full filter blur-3xl opacity-10 animate-float" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-semwz-peach/20 to-transparent rounded-full filter blur-2xl opacity-20 animate-pulse" />
    </section>
  )
}
