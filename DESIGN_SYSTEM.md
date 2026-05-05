# SEMWZ Design System

This document outlines the design system and style guidelines for the SEMWZ e-commerce website.

## Color Palette

### Primary Colors
- **Soft Peach/Nude (Neutral)**: `#F5F0EA`
  - Main background color
  - Creates a warm, premium feel
  - Used extensively throughout the site

- **Black**: `#1a1a1a`
  - Primary typography color
  - Secondary buttons
  - Strong call-to-action elements
  - High contrast for readability

### Secondary Colors
- **Peach Accent**: `#EDD5C8`
  - Interactive elements
  - Hover states
  - Accent details
  - Newsletter buttons

- **Beige**: `#E8DFD5`
  - Alternative backgrounds
  - Soft dividers
  - Secondary text areas

- **White**: `#FFFFFF`
  - Product cards
  - Modal overlays
  - Text backgrounds
  - Clean spaces

## Typography System

### Font Families

#### Display Font: Poppins
- Used for: Headings, titles, brand statements
- Font Weight: 600-800 (Bold)
- Character Spacing: -0.5px (slightly tight)
- Used for: H1, H2, H3, H4

```css
font-family: 'Poppins', system-ui, sans-serif;
font-weight: 700;
```

#### Body Font: Inter
- Used for: Body text, captions, description
- Font Weight: 300-600
- Excellent readability on screen
- Modern and clean appearance

```css
font-family: 'Inter', system-ui, sans-serif;
font-weight: 400;
```

### Font Size Scale

| Element | Size | Weight | Letter Spacing |
|---------|------|--------|-----------------|
| H1 (Page Title) | 2.5rem (40px) | 700 | -0.5px |
| H2 (Section Title) | 2rem (32px) | 700 | -0.3px |
| H3 (Subsection) | 1.5rem (24px) | 600 | -0.2px |
| Body Text | 1rem (16px) | 400 | 0px |
| Small Text | 0.875rem (14px) | 400 | 0.3px |
| Extra Small | 0.75rem (12px) | 500 | 0.5px |

## Component Styling

### Buttons

#### Primary Button
```css
Background: #1a1a1a
Color: #FFFFFF
Padding: 12px 24px
Border Radius: 8px
Font Weight: 500
Hover: bg-opacity-90
Transition: 300ms ease-out
```

#### Secondary Button
```css
Background: Transparent
Border: 2px solid #1a1a1a
Color: #1a1a1a
Padding: 10px 22px
Border Radius: 8px
Hover: bg-#1a1a1a, color-#FFFFFF
```

### Product Cards

- **Background**: White (#FFFFFF)
- **Box Shadow**: `0 2px 8px rgba(0, 0, 0, 0.05)`
- **Hover Shadow**: `0 8px 16px rgba(0, 0, 0, 0.1)`
- **Hover Transform**: `translateY(-4px)`
- **Border Radius**: 8px
- **Image Aspect Ratio**: 3:4

### Input Fields

- **Background**: White
- **Border**: 1px solid #e5e7eb
- **Border Radius**: 6px
- **Padding**: 12px 16px
- **Font Size**: 14px
- **Focus**: Border color changes to #1a1a1a

## Spacing System

| Scale | Size (px) | Usage |
|-------|-----------|-------|
| xs | 4 | Micro spacing |
| sm | 8 | Small gaps |
| md | 12 | Standard spacing |
| lg | 16 | Medium spacing |
| xl | 24 | Large sections |
| 2xl | 32 | Major sections |
| 3xl | 48 | Section padding |
| 4xl | 64 | Large padding |

## Shadow System

| Level | Shadow | Usage |
|-------|--------|-------|
| Subtle | `0 2px 8px rgba(0, 0, 0, 0.05)` | Cards |
| Soft | `0 4px 6px rgba(0, 0, 0, 0.07)` | Buttons, inputs |
| Medium | `0 8px 16px rgba(0, 0, 0, 0.1)` | Hover states |

## Border Radius System

- **Extra Small**: 4px (inputs, badges)
- **Small**: 6px (buttons, cards)
- **Medium**: 8px (product cards, modals)
- **Large**: 12px (sections)
- **Full**: 50% (circles, avatars)

## Animation System

### Transitions
- **Duration**: 300ms
- **Timing**: ease-out
- **Properties**: opacity, transform, color

### Keyframe Animations

#### Fade In
- Duration: 600ms
- From: opacity 0
- To: opacity 1

#### Slide Up
- Duration: 600ms
- From: translateY(20px), opacity 0
- To: translateY(0), opacity 1

#### Hover Scale
- Duration: 300ms
- From: scale(1)
- To: scale(1.05)

## Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Grid Columns
- **Mobile**: 2 columns
- **Tablet**: 3 columns
- **Desktop**: 4 columns

## Brand Voice & Tone

- **Premium**: Refined, sophisticated language
- **Modern**: Contemporary, not dated
- **Confident**: Bold statements about style
- **Editorial**: Magazine-inspired descriptions
- **Accessible**: Simple, jargon-free

## Usage Guidelines

### Color Combinations

**Good Combinations:**
- Black text on white/beige/peach backgrounds
- White text on black background
- Black text on light backgrounds
- Peach accents with black/white

**Avoid:**
- Light text on light backgrounds
- Low contrast text
- Too many colors in one component

### Typography Hierarchy

1. **Page Title** (H1): Poppins, 40px, Bold
2. **Section Title** (H2): Poppins, 32px, Bold
3. **Card Title** (H3): Inter, 18px, Semibold
4. **Body Text**: Inter, 16px, Regular
5. **Secondary Text**: Inter, 14px, Regular
6. **Caption**: Inter, 12px, Medium

### Spacing Pattern

Use multiples of 4px for consistent spacing:
- 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px...

This maintains harmony across the design.

## Accessibility Considerations

- **Contrast**: All text meets WCAG AA standards
- **Typography**: Font sizes never below 12px
- **Clickables**: Minimum 44x44px touch targets
- **Focus States**: Visible focus indicators on all interactive elements
- **Alt Text**: All images have descriptive alt text
- **ARIA Labels**: Form inputs have associated labels

## Customization

### Tailwind CSS Config
All colors, fonts, and spacing are defined in `tailwind.config.js`. To modify the design system:

1. Update color values in the `colors` object
2. Modify font families in the `fontFamily` object  
3. Adjust spacing in the `spacing` object
4. Change animation values in the `animation` and `keyframes` objects

Example:
```javascript
extend: {
  colors: {
    'semwz-black': '#1a1a1a',
    'semwz-peach': '#EDD5C8',
  }
}
```

---

**Last Updated**: February 2026
