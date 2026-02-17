import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import HomeSections from './components/HomeSections'
import Footer from './components/Footer'
import Login from './components/Login'
import Signup from './components/Signup'
import Cart from './components/Cart'
import Search from './components/Search'
import CategoryPage from './pages/CategoryPage'
import NewArrivalsPage from './pages/NewArrivalsPage'
import JeansPage from './pages/JeansPage'
import ShirtsPage from './pages/ShirtsPage'
import CordsPage from './pages/CordsPage'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
function PageLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Home sections - New Arrivals + Category tiles */}
      <HomeSections />

      {/* Footer */}
      <Footer />
    </>
  )
}

function AppContent() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageLayout>
            <HomePage />
          </PageLayout>
        }
      />
      <Route
        path="/category/:slug"
        element={
          <PageLayout>
            <CategoryPage />
          </PageLayout>
        }
      />
      <Route
        path="/new-arrivals"
        element={
          <PageLayout>
            <NewArrivalsPage />
          </PageLayout>
        }
      />
      <Route
        path="/jeans"
        element={
          <PageLayout>
            <JeansPage />
          </PageLayout>
        }
      />
      <Route
        path="/shirts"
        element={
          <PageLayout>
            <ShirtsPage />
          </PageLayout>
        }
      />
      <Route
        path="/co-ord-sets"
        element={
          <PageLayout>
            <CordsPage />
          </PageLayout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/cart"
        element={
          <PageLayout>
            <Cart />
          </PageLayout>
        }
      />
      <Route
        path="/search"
        element={
          <PageLayout>
            <Search />
          </PageLayout>
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="w-full min-h-screen bg-semwz-peach">
            <AppContent />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
