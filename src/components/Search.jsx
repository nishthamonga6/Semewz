import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Search as SearchIcon, ArrowLeft } from 'lucide-react'
import ProductCard from './ProductCard'
import { products } from '../data/products'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q') || ''
  const [localQuery, setLocalQuery] = useState(query)

  // Sync local input when URL query changes (e.g. from header search)
  useEffect(() => {
    setLocalQuery(query)
  }, [query])

  // Combine products from new arrivals, jeans, shirts, and co-ord sets only
  const allProducts = [
    ...products.new,
    ...products.jeans,
    ...products.shirts,
    ...products.cordsets,
  ]

  const filteredProducts = allProducts.filter(product => {
    const searchLower = query.toLowerCase()
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.color.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    )
  })

  const handleSearch = (e) => {
    e.preventDefault()
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery })
    }
  }

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="bg-semwz-peach border-b border-semwz-black/15">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-semwz-black/40" />
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search products, colors, styles..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-semwz-black/20 rounded-lg focus:outline-none focus:border-semwz-black/50 transition-colors text-semwz-black placeholder-semwz-black/40"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-semwz-black text-white font-semibold rounded-lg hover:bg-semwz-black/90 transition-all duration-300"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-semwz-black mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-semwz-black/60">
              Found <span className="font-bold text-semwz-black">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''} for "<span className="font-semibold">{query}</span>"
            </p>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-semwz-black/20 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-semwz-black mb-2">
              No products found
            </h2>
            <p className="text-semwz-black/60 mb-6">
              {query
                ? `We couldn't find anything matching "${query}". Try searching for something else.`
                : 'Enter a search term to find products.'}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-semwz-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-semwz-black/90 transition-all duration-300"
            >
              Back to Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
