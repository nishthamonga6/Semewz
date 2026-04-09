import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, Menu, X } from 'lucide-react'

export default function Header() {
  const [activeCategory, setActiveCategory] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`)
      setSearchInput('')
    }
  }

  const categories = [
    { id: 'new', label: 'New Arrivals', path: '/new-arrivals' },
    { id: 'jeans', label: 'Jeans', path: '/jeans' },
    { id: 'shirts', label: 'Shirts', path: '/shirts' },
    { id: 'cordsets', label: 'Co-ord Sets', path: '/co-ord-sets' },
  ]

  const sectionMap = {
    new: '/new-arrivals',
    jeans: '/jeans',
    shirts: '/shirts',
    cordsets: '/co-ord-sets',
  }

  const handleCategoryClick = (id) => {
    setActiveCategory(id)
    navigate(sectionMap[id] || '/')
  }

  return (
    <header className="navbar bg-semwz-peach sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 py-2.5">
        {/* Desktop Navbar */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between">
            {/* Logo - Left */}
            <Link to="/" aria-label="Go to homepage" className="flex-shrink-0">
              <img src="/logo.png" alt="SEMWZ Logo" className="h-12 object-contain transition-transform duration-300 hover:scale-105" />
            </Link>

            {/* Center Search */}
            <div className="flex-1 flex justify-center">
              <form onSubmit={handleSearch} className="w-full lg:w-3/4 xl:w-2/3 flex items-center bg-white border border-semwz-black/10 rounded-full px-4 py-1.5 gap-3 shadow-sm">
                <Search size={18} className="text-semwz-black/50" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search products, categories, styles"
                  className="bg-transparent text-sm focus:outline-none flex-1 text-semwz-black placeholder-semwz-black/40 px-2"
                />
                <button type="submit" className="text-sm bg-semwz-peach text-semwz-black px-4 py-1 rounded-full">Search</button>
              </form>
            </div>

            {/* Icons - Right */}
            <div className="flex items-center gap-5" />
          </div>

          {/* Sub Navigation */}
          <div className="mt-3 subnav-row">
            <div className="flex items-center justify-between">
              <nav className="flex items-center gap-6">
                <Link to="/" className="category-button text-sm" onClick={() => setActiveCategory('')}>
                  Home
                </Link>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleCategoryClick(c.id)}
                    className={`category-button ${location.pathname === c.path ? 'active' : ''} text-sm`}
                  >
                    {c.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="lg:hidden flex items-center justify-between">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={18} className="text-semwz-black" /> : <Menu size={18} className="text-semwz-black" />}
          </button>

          <Link to="/" aria-label="Go to homepage">
            <img src="/logo.png" alt="SEMWZ Logo" className="h-10 object-contain" />
          </Link>

          <div className="w-6" />
        </div>

        {/* Mobile Nav Dropdown */}
        {menuOpen && (
          <nav className="lg:hidden flex flex-col gap-3 mt-2 pt-2 border-t border-semwz-black/10">
            <form onSubmit={handleSearch} className="flex items-center bg-white border border-semwz-black/10 rounded-lg px-3 py-2 gap-2 mb-2">
              <Search size={14} className="text-semwz-black/40" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                className="bg-transparent text-xs focus:outline-none flex-1 text-semwz-black placeholder-semwz-black/40"
              />
            </form>

            <Link to="/" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-semwz-black">
              Home
            </Link>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  handleCategoryClick(c.id)
                  setMenuOpen(false)
                }}
                className="text-left text-sm font-medium text-semwz-black"
              >
                {c.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
