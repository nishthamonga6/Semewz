import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingBag, Search, Menu, X, LogOut, Home } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Header() {
  const [activeCategory, setActiveCategory] = useState('new')
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const { user, logout } = useAuth()
  const { getTotalItems } = useCart()
  const navigate = useNavigate()
  const cartCount = getTotalItems()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`)
      setSearchInput('')
    }
  }

  const categories = [
    { id: 'new', label: 'New Arrivals' },
    { id: 'jeans', label: 'Jeans' },
    { id: 'shirts', label: 'Shirts' },
    { id: 'cordsets', label: 'Co-ord Sets' },
  ]

  const sectionMap = {
    new: 'new-arrivals',
    jeans: 'jeans',
    shirts: 'shirts',
    cordsets: 'co-ord-sets',
  }

  const location = useLocation()

  const handleCategoryClick = (id) => {
    setActiveCategory(id)
    const targetId = sectionMap[id]
    if (!targetId) return

    // Navigate to the canonical short route for the category
    navigate(`/${targetId}`)
  }

  return (
    <header className="navbar bg-semwz-peach">
      <div className="container mx-auto px-4 lg:px-8 py-2.5">
        {/* Single Line Navbar - Desktop */}
        <div className="hidden lg:flex items-center justify-between gap-6">
          {/* Logo - Left with Hover Animation */}
          <Link to="/" aria-label="Go to homepage">
            <img src="/logo.png" alt="SEMWZ Logo" className="h-11 object-contain flex-shrink-0 transition-transform duration-300 hover:scale-110" />
          </Link>

          {/* Categories - Center */}
          <nav className="flex items-center gap-6 flex-1 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`text-xs tracking-wide transition-all duration-300 font-medium relative group ${
                  activeCategory === category.id
                    ? 'text-semwz-black'
                    : 'text-gray-700 hover:text-semwz-black'
                }`}
              >
                {category.label}
              </button>
            ))}
          </nav>

          {/* Search & Cart & Auth - Right */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-semwz-peach border border-semwz-black/10 rounded-lg px-3 py-1.5 gap-2">
              <Search size={14} className="text-semwz-black/40" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search..."
                className="bg-transparent text-xs focus:outline-none w-32 text-semwz-black placeholder-semwz-black/40"
              />
            </form>

            <Link to="/" className="hidden lg:flex items-center gap-2 text-xs font-medium text-semwz-black hover:opacity-80" aria-label="Home">
              <Home size={16} />
              <span>Home</span>
            </Link>

            <Link to="/cart" className="relative group">
              <ShoppingBag size={16} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-semwz-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-semwz-black/15">
                <span className="text-xs font-medium text-semwz-black">{user.name}</span>
                <button
                  onClick={logout}
                  className="hover:text-gray-700 transition"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 pl-3 border-l border-semwz-black/15">
                <Link
                  to="/login"
                  className="text-xs font-medium text-semwz-black hover:opacity-70 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-xs font-medium bg-semwz-black text-white px-3 py-1.5 rounded-md hover:bg-semwz-black/90 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="lg:hidden flex items-center justify-between">
          {/* Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Logo */}
          <Link to="/" aria-label="Go to homepage">
            <img src="/logo.png" alt="SEMWZ Logo" className="h-10 object-contain" />
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative group">
            <ShoppingBag size={16} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-semwz-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Navigation - Mobile */}
        {menuOpen && (
          <nav className="lg:hidden flex flex-col gap-3 mt-2 pt-2 border-t border-semwz-black border-opacity-10">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex items-center bg-semwz-peach border border-semwz-black/10 rounded-lg px-3 py-2 gap-2 mb-2">
              <Search size={14} className="text-semwz-black/40" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                className="bg-transparent text-xs focus:outline-none flex-1 text-semwz-black placeholder-semwz-black/40"
              />
            </form>

            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  handleCategoryClick(category.id)
                  setMenuOpen(false)
                }}
                className={`text-left text-sm font-medium transition ${
                  activeCategory === category.id
                    ? 'text-semwz-black'
                    : 'text-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}

            {/* Mobile Auth Links */}
            <div className="pt-2 border-t border-semwz-black border-opacity-10 flex flex-col gap-2">
              {user ? (
                <>
                  <p className="text-xs font-medium text-semwz-black">{user.name}</p>
                  <button
                    onClick={() => {
                      logout()
                      setMenuOpen(false)
                    }}
                    className="text-left text-sm font-medium text-gray-700 hover:text-semwz-black transition flex items-center gap-2"
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-left text-sm font-medium text-gray-700 hover:text-semwz-black transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="text-left text-sm font-medium bg-semwz-black text-white px-3 py-1.5 rounded-md hover:bg-semwz-black/90 transition inline-block w-fit"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
