import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function ShirtsPage() {
  const [sortBy, setSortBy] = useState('popularity')
  const [currentPage, setCurrentPage] = useState(1)
  const [activeSlide, setActiveSlide] = useState(0)
  const itemsPerPage = 9

  const allProducts = products.shirts

  const slideshowItems = useMemo(() => {
    const unique = new Map()
    products.shirts.forEach((item) => {
      const imageSrc = item.image?.startsWith('/') ? item.image : `/${item.image}`
      if (!unique.has(imageSrc)) {
        unique.set(imageSrc, { ...item, image: imageSrc })
      }
    })
    return Array.from(unique.values()).slice(0, 7)
  }, [])

  useEffect(() => {
    if (slideshowItems.length <= 1) return

    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideshowItems.length)
    }, 5500)

    return () => clearInterval(interval)
  }, [slideshowItems.length])

  const filteredProducts = useMemo(() => [...allProducts], [allProducts])

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



  return (
    <div className="min-h-screen bg-[#F2D3C5]">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="relative overflow-hidden rounded-[32px] shadow-2xl mb-10">
          <div className="relative h-[420px] sm:h-[520px] bg-black">
            {slideshowItems.map((item, index) => (
              <div
                key={item.image}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-8 left-6 right-6 text-white">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/80 backdrop-blur-sm">
                    Shirts Collection
                  </div>
                  <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                    {item.name}
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed">
                    {item.description || 'Browse the latest shirts with premium styling and timeless silhouettes.'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 z-30">
            {slideshowItems.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-3 w-3 rounded-full transition-all ${index === activeSlide ? 'bg-white shadow-lg w-8' : 'bg-white/40 hover:bg-white'}`}
                aria-label={`Show slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 lg:px-8 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-semwz-black">Home</Link>
          <span>/</span>
          <span className="text-semwz-black font-medium">Shirts</span>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div>
          {/* Main Content */}
          <div>
            {/* Header with Sort and Mobile Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{paginatedProducts.length}</span> results from total <span className="font-semibold">{sortedProducts.length}</span> for "Shirts"
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
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
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
