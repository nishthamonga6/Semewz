import ProductCardUniqlo from './ProductCardUniqlo'
import ProductVariantRow from './ProductVariantRow'
import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export default function ProductGridUniqlo({ products, title, subtitle, id }) {
  const sectionId = id || (title ? title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') : undefined)
  const [sortBy, setSortBy] = useState('recommended')
  const [groupedProducts, setGroupedProducts] = useState({})

  useEffect(() => {
    // Group products by baseProduct
    const grouped = {}
    products.forEach((product) => {
      const baseName = product.baseProduct || product.name
      if (!grouped[baseName]) {
        grouped[baseName] = []
      }
      grouped[baseName].push(product)
    })

    // Sort groups
    let sortedGroups = Object.entries(grouped).sort((a, b) => {
      if (sortBy === 'price-low') {
        return Math.min(...a[1].map(p => p.price)) - Math.min(...b[1].map(p => p.price))
      }
      if (sortBy === 'price-high') {
        return Math.max(...b[1].map(p => p.price)) - Math.max(...a[1].map(p => p.price))
      }
      return 0
    }).reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})

    setGroupedProducts(sortedGroups)
  }, [products, sortBy])

  const totalVariants = products.length

  return (
    <section id={sectionId} className="py-6 lg:py-8 bg-semwz-peach">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        {title && (
          <div className="mb-6 lg:mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-gray-600">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Filter and Sort Bar */}
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200 flex-wrap gap-2">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{totalVariants}</span> items
          </div>

          {/* Sort Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
              Sort: <span className="text-gray-900 font-semibold capitalize">{sortBy === 'recommended' ? 'Recommended' : sortBy.replace('-', ' ')}</span>
              <ChevronDown size={16} />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-300 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <button
                onClick={() => setSortBy('recommended')}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700 font-medium border-b border-gray-100"
              >
                Recommended
              </button>
              <button
                onClick={() => setSortBy('price-low')}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700 font-medium border-b border-gray-100"
              >
                Price: Low to High
              </button>
              <button
                onClick={() => setSortBy('price-high')}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700 font-medium"
              >
                Price: High to Low
              </button>
            </div>
          </div>
        </div>

        {/* Product Variant Groups */}
        <div className="space-y-6">
          {Object.entries(groupedProducts).map(([baseName, variants]) => (
            <ProductVariantRow
              key={baseName}
              baseProduct={baseName}
              variants={variants}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
