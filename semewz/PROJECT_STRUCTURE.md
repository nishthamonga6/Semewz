# SEMWZ Project Structure Guide

## Directory Overview

```
semewz/
├── src/
│   ├── components/          # Reusable React components
│   ├── context/             # React Context API files
│   ├── data/                # Static data and constants
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Helper functions and utilities
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles and animations
├── public/                  # Static assets (if needed)
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── package.json             # Project dependencies
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignore rules
├── README.md                # Project documentation
└── DESIGN_SYSTEM.md         # Design system guidelines
```

## Detailed Directory Descriptions

### `/src/components`
Contains all reusable React components.

```
components/
├── Header.jsx              # Navigation bar with logo and categories
├── Hero.jsx                # Hero banner with CTA
├── EditorialSection.jsx    # Magazine-style product showcase
├── ProductCard.jsx         # Individual product display with actions
├── ProductGrid.jsx         # Grid layout for displaying products
├── NewsletterSignup.jsx    # Email subscription form
├── Wishlist.jsx            # Wishlist display component
└── Footer.jsx              # Footer with links and info
```

**Component Guidelines:**
- Each component is self-contained and reusable
- Props are used for configuration
- Local state managed with `useState` where needed
- Custom hooks used for complex logic

### `/src/context`
React Context API files for global state management.

```
context/
└── CartContext.jsx         # Shopping cart state management
```

**Context Structure:**
- Provides cart actions (add, remove, update quantity)
- Offers cart totals and items access
- Uses custom `useCart` hook for consumption

### `/src/data`
Static data files and constants.

```
data/
└── products.js             # Product catalog with all items
```

**Data Format:**
- Products organized by category
- Each product includes: id, name, price, image, sizes, description
- Easy to replace with API calls in the future

### `/src/hooks`
Custom React hooks for reusable logic.

```
hooks/
└── useCustom.js            # Custom hooks library
   ├── useLoading()         # Loading state management
   ├── useAsync()           # Async operation handling
   ├── useLocalStorage()    # localStorage persistence
   ├── useClickOutside()    # Detect outside clicks
   └── useMediaQuery()      # Media query matching
```

**Hook Usage:**
```javascript
import { useLoading, useLocalStorage } from '@/hooks/useCustom'

function MyComponent() {
  const { isLoading, startLoading } = useLoading()
  const [favorites, setFavorites] = useLocalStorage('favorites', [])
}
```

### `/src/utils`
Helper functions and utilities.

```
utils/
└── helpers.js              # Utility functions
   ├── formatPrice()        # Format to INR currency
   ├── truncateText()       # Truncate long strings
   ├── isInStock()          # Check product availability
   ├── calculateDiscount()  # Calculate discount percentage
   ├── debounce()           # Debounce function calls
   └── smoothScroll()       # Smooth scroll animation
```

**Usage:**
```javascript
import { formatPrice, truncateText } from '@/utils/helpers'

const price = formatPrice(2499)  // "₹2,499.00"
const text = truncateText("Long text", 20)  // "Long text..."
```

## Component Architecture

### Page Layout Hierarchy

```
App
├── Header
├── Hero
├── EditorialSection
├── ProductGrid (multiple instances)
│   └── ProductCard (multiple)
├── NewsletterSignup
└── Footer
```

### Component Props Examples

#### ProductCard
```javascript
<ProductCard product={{
  id: 1,
  name: "Premium Jeans",
  price: 2499,
  image: "url",
  category: "jeans",
  sizes: ["S", "M", "L"],
  description: "...",
  color: "Black"
}} />
```

#### ProductGrid
```javascript
<ProductGrid
  products={[...]}
  title="Section Title"
  subtitle="Section subtitle"
/>
```

## State Management Strategy

### Local State (useState)
Used in components that need isolated state:
- Product card size selection
- Modal/menu open/close states
- Form input values
- Wishlist toggle

### Global State (Context)
Used for app-wide data:
- Shopping cart items and totals
- User authentication (future)
- User preferences (future)

### Side Effects (useEffect)
Used for:
- Data fetching
- Event listeners
- localStorage sync
- Analytics tracking

## Styling Approach

### Tailwind CSS
- Primary styling method
- Utility-first approach
- Responsive classes (sm:, md:, lg:, xl:)
- Custom colors defined in config

### CSS Custom Classes
- Global animations in `index.css`
- Component-specific classes
- Reusable utility classes (`.button`, `.product-card`)

### Responsive Design Pattern
```javascript
<div className="grid grid-cols-2 lg:grid-cols-4">
  {/* 2 columns on mobile, 4 on desktop */}
</div>
```

## Development Workflow

### Adding a New Page

1. Create a new component in `/src/components`
2. Import in `App.jsx`
3. Add route if using React Router
4. Style using Tailwind utilities
5. Use custom hooks for logic

### Adding a New Feature

1. Create custom hook in `/src/hooks` if needed
2. Create component in `/src/components`
3. Add state management in Context if global
4. Update data in `/src/data` if needed
5. Import and integrate in App.jsx

### Adding Product Data

Products are in `/src/data/products.js`:
```javascript
export const products = {
  jeans: [
    {
      id: 1,
      name: "...",
      price: 2499,
      // ... other fields
    }
  ]
}
```

## Performance Optimization Tips

### Code Splitting
Ready for lazy loading with React.lazy():
```javascript
const ProductGrid = React.lazy(() => import('./components/ProductGrid'))
```

### Image Optimization
- Use Next Image or similar in the future
- Currently using Unsplash for placeholder images
- Consider image CDN for production

### Bundle Size
- Monitor with `npm run build`
- Use production build analysis tools
- Tree-shake unused code

## Environment Variables

Create a `.env.local` file:
```
VITE_API_URL=https://api.example.com
VITE_STRIPE_KEY=pk_...
```

Access with `import.meta.env.VITE_*`

## Building for Production

```bash
npm run build
npm run preview
```

This creates optimized static files in the `dist/` directory ready for deployment.

## Deployment

The project is ready to deploy to:
- Vercel
- Netlify
- GitHub Pages
- Traditional hosting with static files

Just upload the `dist/` folder contents.

---

**Last Updated**: February 2026
