import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import { products } from '../data/products'

export default function HomeSections() {
  const newArrivals = products.new.slice(0, 6)

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

      {/* Category Preview Sections */}
      <section className="py-16 lg:py-24 border-b border-semwz-black/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-16">
            {[
              {
                id: 'jeans',
                title: 'Jeans',
                subtitle: 'Explore our latest denim styles in every fit.',
                path: '/jeans',
                products: products.jeans.slice(0, 3),
              },
              {
                id: 'shirts',
                title: 'Shirts',
                subtitle: 'Fresh shirt drops that make every outfit sharper.',
                path: '/shirts',
                products: products.shirts.slice(0, 3),
              },
              {
                id: 'cordsets',
                title: 'Co-ord Sets',
                subtitle: 'Complete matching sets for an effortless styled look.',
                path: '/co-ord-sets',
                products: products.cordsets.slice(0, 3),
              },
            ].map((section) => (
              <div key={section.id} className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-light tracking-tight text-semwz-black">
                      {section.title}
                    </h2>
                    <p className="mt-2 text-semwz-black/60 text-sm max-w-xl">
                      {section.subtitle}
                    </p>
                  </div>
                  <Link
                    to={section.path}
                    className="inline-flex items-center justify-center rounded-full border border-semwz-black px-5 py-3 text-sm font-medium text-semwz-black transition hover:bg-semwz-black/5"
                  >
                    View More
                    <span className="ml-2">→</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
