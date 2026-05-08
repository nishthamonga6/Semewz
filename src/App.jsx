import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HomeSections from "./components/HomeSections";
import Footer from "./components/Footer";
import Search from "./components/Search";
import CategoryPage from "./pages/CategoryPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import JeansPage from "./pages/JeansPage";
import ShirtsPage from "./pages/ShirtsPage";
import CordsPage from "./pages/CordsPage";
import { ProductDetailProvider } from "./context/ProductDetailContext";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return null;
}

function PageLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
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
  );
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
      <Route
        path="/trousers"
        element={
          <PageLayout>
            <CategoryPage staticSlug="trousers" />
          </PageLayout>
        }
      />
      <Route
        path="/skirts"
        element={
          <PageLayout>
            <CategoryPage staticSlug="skirts" />
          </PageLayout>
        }
      />
      <Route
        path="/dresses"
        element={
          <PageLayout>
            <CategoryPage staticSlug="dresses" />
          </PageLayout>
        }
      />
      <Route
        path="/night-wear"
        element={
          <PageLayout>
            <CategoryPage staticSlug="night-wear" />
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
  );
}

function App() {
  return (
    <ProductDetailProvider>
      <Router>
        <ScrollToTop />
        <div className="w-full min-h-screen bg-semwz-peach">
          <AppContent />
        </div>
      </Router>
    </ProductDetailProvider>
  );
}

export default App;
