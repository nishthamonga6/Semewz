import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function CordsPage() {
  const [sortBy, setSortBy] = useState('popularity')
  const [activeFilters, setActiveFilters] = useState({ priceRange: null })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const allProducts = products.cordsets

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]

    // Price filter
    if (activeFilters.priceRange) {
      const [min, max] = activeFilters.priceRange
      filtered = filtered.filter(p => p.price >= min && p.price <= max)
    }

    return filtered
  }, [activeFilters])

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price)
      case 'newest':
        return sorted.reverse()
      case 'popularity':
      default:
        return sorted
    }
  }, [filteredProducts, sortBy])

  // Paginate
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)

  const togglePriceFilter = (range) => {
    if (activeFilters.priceRange === range) {
      setActiveFilters({ ...activeFilters, priceRange: null })
    } else {
      setActiveFilters({ ...activeFilters, priceRange: range })
    }
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setActiveFilters({ priceRange: null })
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-[#F2D3C5]">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 lg:px-8 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-semwz-black">Home</Link>
          <span>/</span>
          <span className="text-semwz-black font-medium">Co-ord Sets</span>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:sticky lg:top-24">
            <div className="space-y-6">
              {/* Filter Header */}
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-semwz-black">Filters</h3>
                {(activeFilters.priceRange) && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-gray-600 hover:text-semwz-black underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Price Filter */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-semwz-black">Price</h4>
                <div className="space-y-2">
                  {[
                    { range: [0, 3000], label: 'Under ₹3000' },
                    { range: [3000, 3500], label: '₹3000 - ₹3500' },
                    { range: [3500, 4000], label: '₹3500 - ₹4000' },
                    { range: [4000, 5000], label: '₹4000 - ₹5000' },
                  ].map((filter) => (
                    <label key={filter.label} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-semwz-black">
                      <input
                        type="checkbox"
                        checked={activeFilters.priceRange === filter.range}
                        onChange={() => togglePriceFilter(filter.range)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      {filter.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Style Filter */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-semwz-black">Style</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="hover:text-semwz-black cursor-pointer">Classic</li>
                  <li className="hover:text-semwz-black cursor-pointer">Modern</li>
                  <li className="hover:text-semwz-black cursor-pointer">Luxury</li>
                  <li className="hover:text-semwz-black cursor-pointer">Casual</li>
                </ul>
              </div>

              {/* Color Filter */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-semwz-black">Color</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="hover:text-semwz-black cursor-pointer">Black</li>
                  <li className="hover:text-semwz-black cursor-pointer">Cream</li>
                  <li className="hover:text-semwz-black cursor-pointer">Beige</li>
                  <li className="hover:text-semwz-black cursor-pointer">Grey</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header with Sort */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{paginatedProducts.length}</span> results from total <span className="font-semibold">{sortedProducts.length}</span> for "Co-ord Sets"
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:border-semwz-black cursor-pointer"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-600" />
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFilters.priceRange && (
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm text-gray-600">Applied Filters:</span>
                {activeFilters.priceRange && (
                  <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                    <span className="text-sm">₹{activeFilters.priceRange[0]} - ₹{activeFilters.priceRange[1]}</span>
                    <button
                      onClick={() => togglePriceFilter(activeFilters.priceRange)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm rounded ${
                      currentPage === page
                        ? 'bg-semwz-black text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
