# SEMWZ - Developer Quick Reference Card

## 🚀 Quick Start
```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

Browser: `http://localhost:3000`

---

## 🎨 Tailwind Classes Quick Guide

### Spacing
```
p-4    padding: 1rem
m-2    margin: 0.5rem
gap-6  gap: 1.5rem
```

### Typography
```
text-3xl      font-size: 1.875rem
font-bold     font-weight: 700
text-gray-600 color: #4b5563
```

### Colors
```
bg-semwz-black bg-semwz-peach text-white
border-gray-300
```

### Layout
```
flex items-center justify-between
grid grid-cols-2 lg:grid-cols-4 gap-4
container mx-auto px-4
```

### Responsive
```
hidden md:block          show on desktop
grid-cols-2 lg:grid-cols-4
```

---

## 📁 File Locations

| Task | File |
|------|------|
| Add a product | `src/data/products.js` |
| Change colors | `tailwind.config.js` |
| Add component | `src/components/` |
| Global styles | `src/index.css` |
| Add hook | `src/hooks/useCustom.js` |
| Add utility | `src/utils/helpers.js` |

---

## 🧩 Component Template

```jsx
import { useState } from 'react'

export default function ComponentName() {
  const [state, setState] = useState(null)
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold">Title</h2>
        {/* Content */}
      </div>
    </section>
  )
}
```

---

## 🎯 Common Imports

```javascript
import { useState, useEffect } from 'react'
import { ShoppingBag, Heart, Menu } from 'lucide-react'
import { products } from './data/products'
import { useCart } from './context/CartContext'
import { formatPrice } from './utils/helpers'
```

---

## 🔄 Component Pattern

### Props
```jsx
<ProductCard product={product} onAddToCart={handler} />
```

### State
```jsx
const [cart, setCart] = useState([])
```

### Events
```jsx
<button onClick={() => handleClick()}>Click</button>
<input onChange={(e) => setValue(e.target.value)} />
```

### Conditional
```jsx
{isVisible && <Component />}
{items.length > 0 ? <List /> : <Empty />}
```

---

## 🎨 Button Styles

### Primary Button
```jsx
<button className="button button-primary">
  Click me
</button>
```

### Secondary Button
```jsx
<button className="button button-secondary">
  Click me
</button>
```

---

## 📦 Adding Products

Format in `src/data/products.js`:
```javascript
{
  id: 1,
  name: "Product Name",           // Product title
  price: 2499,                    // Price in rupees
  image: "https://image.jpg",     // Image URL
  category: "jeans",              // jeans/shirts/cordsets/new
  sizes: ["S", "M", "L", "XL"],   // Available sizes
  description: "Description",     // Short description
  color: "Black"                  // Color option
}
```

---

## 🎯 State Management

### Local State (Component)
```jsx
const [count, setCount] = useState(0)
```

### Global State (Context)
```jsx
import { useCart } from './context/CartContext'
const { cartItems, addToCart } = useCart()
```

---

## 🔗 Navigation

Currently categories are:
- New Arrivals
- Jeans
- Shirts
- Cord Sets

Edit in `src/components/Header.jsx`

---

## 🎨 Icons (from Lucide)

```jsx
import { 
  ShoppingBag,    // Cart icon
  Heart,          // Wishlist icon
  Menu,           // Menu icon
  Search,         // Search icon
  Mail,           // Email icon
} from 'lucide-react'

<ShoppingBag size={20} />
```

All icons: https://lucide.dev

---

## 📱 Responsive Breakpoints

```
Mobile:     < 640px   (default)
Tablet:     640px+    (sm:)
         768px+    (md:)
Desktop:    1024px+   (lg:)
      1280px+   (xl:)
```

Example:
```jsx
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
```

---

## 🐛 Debugging

```javascript
console.log('Value:', variable)      // Log value
console.error('Error:', error)       // Log error
console.table(array)                 // Log as table
console.time('timer')                // Start timer
console.timeEnd('timer')             // End timer
```

---

## 💾 Saving/Loading Data

```javascript
// Save to localStorage
localStorage.setItem('key', JSON.stringify(data))

// Load from localStorage
const data = JSON.parse(localStorage.getItem('key'))
```

Or use custom hook:
```javascript
import { useLocalStorage } from '@/hooks/useCustom'
const [favorites, setFavorites] = useLocalStorage('favorites', [])
```

---

## 🔐 Common Security Checks

- ✅ Never hardcode secrets
- ✅ Use environment variables
- ✅ Validate inputs
- ✅ Escape user content
- ✅ Use HTTPS

---

## ⚡ Performance Tips

- Use React.lazy() for code splitting
- Optimize images
- Minimize re-renders
- Use useCallback for handlers
- Avoid inline functions
- Monitor with React DevTools

---

## 🚀 Deploy Commands

### Build
```bash
npm run build
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
```bash
npm i -g netlify-cli
netlify deploy
```

---

## 📚 Key Colors

```
Brand Black:   #1a1a1a  (text, buttons)
Peach Accent:  #EDD5C8  (hover, accents)
Light BG:      #F5F0EA  (main background)
Beige:         #E8DFD5  (secondary)
White:         #FFFFFF  (cards)
```

---

## 🎯 Form Patterns

```jsx
const [form, setForm] = useState({
  email: '',
  password: ''
})

const handleChange = (e) => {
  const { name, value } = e.target
  setForm(prev => ({ ...prev, [name]: value }))
}

const handleSubmit = (e) => {
  e.preventDefault()
  console.log(form)
}

<form onSubmit={handleSubmit}>
  <input 
    name="email"
    value={form.email}
    onChange={handleChange}
  />
</form>
```

---

## 📊 Useful Links

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Docs](https://vitejs.dev)
- [Lucide Icons](https://lucide.dev)
- [MDN Web Docs](https://developer.mozilla.org)

---

## ✅ Pre-Launch Checklist

- [ ] All links working
- [ ] Images loading
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Colors correct
- [ ] Typography right
- [ ] Buttons functional
- [ ] Forms working
- [ ] Performance good
- [ ] SEO ready

---

## 🆘 Common Issues

**Port 3000 in use?**
```bash
sudo lsof -ti:3000 | xargs kill -9
```

**Styles not showing?**
- Clear cache (Ctrl+Shift+Delete)
- Check Tailwind classes
- Restart dev server

**Component not rendering?**
- Check for errors in console
- Verify imports
- Check JSX syntax

---

**Print this page for quick reference while coding!**

Last Updated: February 8, 2026
