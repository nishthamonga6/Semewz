# 🚀 Getting Started with SEMWZ

Welcome to the SEMWZ e-commerce platform! This guide will help you get up and running quickly.

## Prerequisites

Before you begin, ensure you have:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)
- A code editor (VS Code recommended)

## Quick Start (5 minutes)

### 1. Clone/Open the Project
```bash
cd /Users/nishtha/Desktop/semewz
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Your browser will automatically open to `http://localhost:3000`

### 4. Start Building! 🎉

## Project Overview

SEMWZ is a modern fashion e-commerce website showcasing:
- **Jeans** - Various styles and fits
- **Shirts** - Premium quality basics
- **Cordinated Sets** - Matching top and bottom combos
- **New Arrivals** - Fresh seasonal items

### Current Features
✅ Responsive design  
✅ Product catalog with images  
✅ Size selector  
✅ Wishlist buttons  
✅ Newsletter signup  
✅ Editorial content sections  

### Coming Soon
- Shopping cart functionality
- User accounts
- Payment processing
- Order tracking

## Development Guide

### Making Your First Change

1. **Open `src/components/Header.jsx`**
   - This is the main navigation component
   - Try changing the brand colors or text

2. **Modify Tailwind Classes**
   - All styling is done with Tailwind CSS utility classes
   - Changes hot-reload automatically when you save

3. **Example: Change the brand tagline**
   ```jsx
   <p className="text-xs text-gray-600 tracking-wide font-light">
     BE YOUR OWN MUSE  {/* Change this text */}
   </p>
   ```

### Common Development Tasks

#### Adding a New Product
Edit `src/data/products.js`:
```javascript
{
  id: 5,
  name: "Your Product Name",
  price: 1999,
  image: "https://image-url.jpg",
  category: "jeans", // or "shirts", "cordsets", "new"
  sizes: ["S", "M", "L", "XL"],
  description: "Product description",
  color: "Color name"
}
```

#### Changing Brand Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'semwz-black': '#1a1a1a',  // Change this
  'semwz-peach': '#EDD5C8',  // Or this
}
```

#### Creating a New Component
1. Create file in `src/components/MyComponent.jsx`
2. Write component:
```javascript
export default function MyComponent() {
  return (
    <div className="container mx-auto px-4">
      {/* Your content */}
    </div>
  )
}
```
3. Import in `App.jsx`:
```javascript
import MyComponent from './components/MyComponent'
```
4. Use in App:
```jsx
<MyComponent />
```

#### Using State in a Component
```javascript
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Check code quality
npm run lint
```

## Folder Structure Explained

```
src/
├── components/       # Reusable React components
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── ProductCard.jsx
│   └── ... more components
├── context/          # Global state (Redux alternative)
│   └── CartContext.jsx
├── data/             # Static data
│   └── products.js
├── hooks/            # Custom React hooks
│   └── useCustom.js
├── utils/            # Helper functions
│   └── helpers.js
├── App.jsx           # Main component
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## Working with Components

### Component Template
```javascript
import { useState } from 'react'
import { SomeIcon } from 'lucide-react'

export default function ComponentName() {
  const [state, setState] = useState(null)
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">
          Title
        </h2>
        {/* Content */}
      </div>
    </section>
  )
}
```

### Responsive Classes
Tailwind makes it easy:
```jsx
<div className="
  grid 
  grid-cols-1      // 1 column on mobile
  md:grid-cols-2   // 2 columns on tablets
  lg:grid-cols-4   // 4 columns on desktop
">
```

### Button Styles
Use pre-defined button styles:
```jsx
<button className="button button-primary">
  Primary Button
</button>

<button className="button button-secondary">
  Secondary Button
</button>
```

## Styling Guide

### Tailwind CSS Cheat Sheet
```jsx
{/* Spacing */}
<div className="p-4 m-2 gap-6">

{/* Colors */}
<div className="bg-semwz-black text-white">

{/* Typography */}
<h1 className="text-3xl font-bold">
<p className="text-sm text-gray-600">

{/* Layout */}
<div className="flex items-center justify-between">
<div className="grid grid-cols-3 gap-4">

{/* Responsive */}
<div className="hidden md:block lg:flex">

{/* Hover/Active States */}
<button className="hover:bg-opacity-90 active:scale-95">
```

## Adding Icons

We use **Lucide React** for icons:
```javascript
import { ShoppingBag, Heart, Search, Menu } from 'lucide-react'

export default function Component() {
  return (
    <button>
      <ShoppingBag size={20} />
    </button>
  )
}
```

Browse available icons: https://lucide.dev

## Common Patterns

### Conditional Rendering
```jsx
{isLoggedIn ? (
  <p>Welcome back!</p>
) : (
  <p>Please log in</p>
)}
```

### Looping through arrays
```jsx
{products.map(product => (
  <ProductCard key={product.id} product={product} />
))}
```

### Handling form input
```jsx
const [email, setEmail] = useState('')

<input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter email"
/>
```

## Setting Up Your Editor

### VS Code Extensions (Recommended)
- **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
- **Tailwind CSS IntelliSense** - bradlc.vscode-tailwindcss
- **Prettier** - esbenp.prettier-vscode
- **ESLint** - dbaeumer.vscode-eslint

### VS Code Settings
Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Debugging Tips

### Console Logging
```javascript
console.log('Value:', variableName)
console.error('Error message:', error)
console.table(arrayOfObjects)
```

### React DevTools
1. Install [React DevTools Extension](https://chrome.google.com/webstore)
2. Open Chrome DevTools (F12)
3. Go to React tab to inspect components and state

### Browser DevTools
- **Elements Tab**: See HTML structure
- **Console Tab**: See JavaScript errors
- **Network Tab**: See API requests
- **Performance Tab**: Optimize load times

## Common Issues & Solutions

### Problem: Port 3000 already in use
```bash
# Kill the process using port 3000
sudo lsof -ti:3000 | xargs kill -9
```

### Problem: Blank page or errors
- Check browser console (F12)
- Make sure all imports are correct
- Restart dev server: `npm run dev`

### Problem: Styles not showing
- Clear browser cache (Ctrl+Shift+Delete)
- Make sure you're using Tailwind classes
- Check `tailwind.config.js` is correct

### Problem: Component not rendering
- Check JSX syntax (parentheses, return statement)
- Verify import statements
- Check browser console for errors

## Production Build

### Build for Deployment
```bash
npm run build
```

This creates optimized files in `dist/` folder.

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect repo to Vercel
3. Deploy with one click

### Deploy to Netlify
1. Push code to GitHub
2. Connect repo to Netlify
3. Deploy with one click

### Deploy to Traditional Hosting
Upload contents of `dist/` folder to your server.

## Next Steps

1. **Explore the Codebase**
   - Open each component and understand the structure
   - Review the design system in `DESIGN_SYSTEM.md`
   - Check the roadmap in `ROADMAP.md`

2. **Make a Small Change**
   - Try updating the hero section text
   - Change a product price
   - Modify a button color

3. **Learn More**
   - [React Documentation](https://react.dev)
   - [Tailwind CSS Docs](https://tailwindcss.com/docs)
   - [Vite Guide](https://vitejs.dev/)
   - [Lucide Icons](https://lucide.dev)

4. **Join the Team**
   - Read the ROADMAP
   - Pick a feature to work on
   - Create a branch: `git checkout -b feature/my-feature`
   - Make your changes
   - Create a pull request

## Getting Help

- Check existing documentation (README, DESIGN_SYSTEM, ROADMAP)
- Search for similar issues
- Check browser console for errors
- Ask team members on Slack/Discord
- Refer to framework documentation

## Best Practices

✅ **Do:**
- Keep components small and focused
- Use meaningful variable names
- Add comments for complex logic
- Test changes before committing
- Follow Tailwind naming conventions
- Use semantic HTML
- Keep code DRY (Don't Repeat Yourself)

❌ **Don't:**
- Use inline styles (use Tailwind instead)
- Create huge components (break them down)
- Commit broken code
- Ignore console warnings/errors
- Hardcode values (use variables/config)
- Leave commented-out code

## Performance Tips

- Lazy load images
- Minimize re-renders with proper state management
- Use React.memo for expensive components
- Optimize images before upload
- Monitor bundle size with `npm run build`

## Accessibility Guidelines

- Use semantic HTML (`<button>`, `<nav>`, etc.)
- Add alt text to images
- Ensure color contrast ratios meet WCAG standards
- Make interactive elements keyboard accessible
- Add ARIA labels where needed

## Code of Conduct

- Be respectful and collaborative
- Give constructive feedback
- Share knowledge with team members
- Report bugs clearly with reproduction steps
- Test your code before pushing
- Document your changes

---

**Happy Coding! 🎉**

For more information, see:
- [README.md](./README.md) - Project overview
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Design guidelines
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Code organization
- [ROADMAP.md](./ROADMAP.md) - Future features

**Questions?** Ask the team!

Last Updated: February 8, 2026
