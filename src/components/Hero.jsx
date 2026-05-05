import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-semwz-peach">
      {/* Full-width image banner */}
      <div 
        className="relative h-[60vh] min-h-[400px] lg:h-[75vh] lg:min-h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&h=900&fit=crop)',
        }}
      >
        {/* Subtle overlay for readability */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Centered CTA - minimal, luxury style */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-3xl lg:text-5xl font-light tracking-tight text-white mb-4 drop-shadow-lg">
            Curated Collections
          </h1>
          <p className="text-white/90 text-base lg:text-lg font-light mb-8 max-w-md">
            Premium fashion for the modern individual
          </p>
          <Link
            to="/new-arrivals"
            className="inline-block border border-white text-white px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-white hover:text-semwz-black transition-all duration-300"
          >
            Shop New Arrivals
          </Link>
        </div>
      </div>
    </section>
  )
}
