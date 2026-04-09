import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function CordsPage() {
  const [sortBy, setSortBy] = useState('popularity')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const allProducts = products.cordsets

  const filteredProducts = useMemo(() => [...allProducts], [allProducts])

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]
    switch (sortBy) {
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
        <div>
          {/* Main Content */}
          <div>
            {/* Header with Sort and Mobile Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{paginatedProducts.length}</span> results from total <span className="font-semibold">{sortedProducts.length}</span> for "Co-ord Sets"
              </div>
              <div className="flex items-center gap-3">


                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:border-semwz-black cursor-pointer pr-8"
                    >
                      <option value="popularity">Popularity</option>
                      <option value="newest">Newest</option>

                    </select>
                    <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
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
