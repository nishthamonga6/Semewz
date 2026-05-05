<<<<<<< HEAD
# Semewz
=======
# SEMWZ - Fashion E-Commerce Website

## About SEMWZ
SEMWZ is a modern, minimal fashion e-commerce platform designed for young adults seeking premium quality apparel. Our brand motto is **"Be Your Own Muse."** We specialize in jeans, shirts, and coordinated sets with an editorial, luxury feel that's accessible and trendy.

## Design Inspiration
- **H&M Website**: Clean layout, premium fashion feel, editorial-style product cards
- **Color Palette**: Soft peach/nude backgrounds, black typography, white and beige tones
- **Typography**: Modern sans-serif fonts (Inter & Poppins) for a contemporary aesthetic
- **UI Style**: Flat design with soft shadows and smooth micro-interactions

## Features

### UI/UX Components
- **Minimal Top Navigation Bar**: Centered logo with smooth category navigation
- **Categories**: New Arrivals, Jeans, Shirts, Cord Sets
- **Large Hero Section**: Fashion-forward imagery with call-to-action
- **Grid-Based Product Listing**: Responsive 2-column (mobile) to 4-column (desktop) layout
- **Product Cards**: 
  - High-quality images with hover zoom effect
  - Size selector
  - Quick add-to-cart functionality
  - Wishlist button (heart icon)
  - Price and color information
- **Editorial Section**: Magazine-style content display
- **Premium Footer**: Newsletter signup, contact info, social links, legal links

### Interactive Elements
- Smooth hover animations on product cards
- Category navigation with active state indicators
- Size selector with visual feedback
- Add-to-cart and wishlist buttons
- Mobile-responsive design
- Floating cart counter

### Product Categories
1. **Jeans**: Multiple styles from skinny to wide-leg to mom jeans
2. **Shirts**: Basics and premium pieces in various colors
3. **Coordinated Sets**: Matching top and bottom combinations
4. **New Arrivals**: Seasonal and trending items

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router (ready to implement)

## Project Structure

```
semewz/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation bar with logo and cart
│   │   ├── Hero.jsx            # Hero banner section
│   │   ├── EditorialSection.jsx # Magazine-style content
│   │   ├── ProductCard.jsx     # Individual product card component
│   │   ├── ProductGrid.jsx     # Grid layout for products
│   │   └── Footer.jsx          # Footer with links and info
│   ├── data/
│   │   └── products.js         # Product catalog and data
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # React entry point
│   └── index.css               # Custom styles and animations
├── index.html                  # HTML entry point
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── package.json               # Dependencies and scripts
```

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000/`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Color Palette Reference

| Color Name | Hex Code | Usage |
|-----------|----------|-------|
| Neutral | #F5F0EA | Main background |
| Peach | #EDD5C8 | Accent elements |
| Black | #1a1a1a | Primary typography |
| Beige | #E8DFD5 | Secondary backgrounds |
| White | #FFFFFF | Cards and overlays |

## Typography

### Fonts
- **Display Font**: Poppins (Bold headings)
- **Body Font**: Inter (Clean, readable body text)

### Font Weights
- **Headings**: 700 (Bold)
- **Body**: 400 (Regular)
- **Accents**: 500-600 (Medium to Semibold)

## Future Enhancements

- [ ] Shopping cart functionality
- [ ] Wishlist persistence (localStorage/database)
- [ ] Product filtering and sorting
- [ ] Search functionality
- [ ] Product detail pages
- [ ] User authentication
- [ ] Payment integration
- [ ] Order management
- [ ] Customer reviews and ratings
- [ ] Size guide modal
- [ ] Image zoom and gallery
- [ ] Similar products recommendations

## Brand Values

- **Premium**: High-quality fabrics and construction
- **Confident**: Designs that make you feel assured
- **Minimalist**: Clean lines, no unnecessary clutter
- **Fashion-Forward**: Staying ahead of trends
- **Editorial**: Fashion-magazine inspired curation
- **Accessible**: Affordable luxury for young adults

## Contact & Social

- **Email**: hello@semwz.com
- **Instagram**: @semwz
- **Twitter**: @semwz
- **Location**: India

## License

© 2026 SEMWZ. All rights reserved.

---

**Built with ❤️ by SEMWZ Team**
>>>>>>> 3895cff (Initial commit)
