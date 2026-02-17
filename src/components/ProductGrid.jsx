import ProductCard from './ProductCard'

export default function ProductGrid({ products, title, subtitle, id }) {
  const sectionId = id || (title ? title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') : undefined)

  return (
    <section id={sectionId} className="py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        {title && (
          <div className="mb-12 lg:mb-16 text-center">
            <h2 className="section-heading text-semwz-black mb-3">
              {title}
            </h2>
            {subtitle && (
              <p className="section-subtitle">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Products Grid with Stagger Animation */}
        <div className="product-grid grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* All products are shown inline — no 'View All' CTA needed */}
      </div>
    </section>
  )
}
