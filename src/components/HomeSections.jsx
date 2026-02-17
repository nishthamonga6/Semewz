import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import { products } from '../data/products'

export default function HomeSections() {
  const newArrivals = products.new.slice(0, 8)
  const categories = [
    {
      id: 'jeans',
      title: 'Jeans',
      image: 'https://images.unsplash.com/photo-1541099649105-1e1f5a6d5f8c?w=600&h=800&fit=crop',
      path: '/jeans',
    },
    {
      id: 'shirts',
      title: 'Shirts',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
      path: '/shirts',
    },
    {
      id: 'cordsets',
      title: 'Co-ord Sets',
      image: 'https://images.unsplash.com/photo-1624529888383-79249e5c1c21?w=600&h=800&fit=crop',
      path: '/co-ord-sets',
    },
  ]

  return (
    <div className="bg-semwz-peach">
      {/* New Arrivals Section */}
      <section className="py-16 lg:py-24 border-b border-semwz-black/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-2xl lg:text-3xl font-light tracking-tight text-semwz-black mb-2">
                New Arrivals
              </h2>
              <p className="text-semwz-black/60 text-sm">
                This week&apos;s latest drops
              </p>
            </div>
            <Link
              to="/new-arrivals"
              className="text-sm font-medium tracking-wide text-semwz-black border-b border-semwz-black pb-0.5 hover:opacity-70 transition"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Tiles - Shop by category */}
      <section className="py-16 lg:py-24 border-b border-semwz-black/10">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-light tracking-tight text-semwz-black mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={cat.path}
                className="group relative aspect-[3/4] overflow-hidden bg-neutral-100"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-medium text-white tracking-wide">
                    {cat.title}
                  </h3>
                  <span className="text-sm text-white/90 mt-1 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Shop now
                    <span className="text-white">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
