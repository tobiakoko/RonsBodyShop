# Ron's Body Shop

A modern, responsive website for Ron's Body Shop - expert collision repair and auto body services in Torrance, California.

## Features

- **Modern Design System** - Clean, professional UI with consistent design patterns
- **Fully Responsive** - Optimized for mobile, tablet, and desktop experiences
- **Video Hero Background** - Engaging video background on the homepage
- **Interactive Contact Form** - Integrated contact form with validation
- **Smooth Scrolling** - Custom scroll hooks for enhanced navigation experience
- **Component-Based Architecture** - Modular React components for maintainability
- **SEO Optimized** - Proper meta tags and semantic HTML structure
- **Accessible** - WCAG compliant with proper ARIA labels and keyboard navigation
- **Fast Performance** - Built with Vite for optimal build times and HMR

## Tech Stack

- **React 19** - Latest React with modern hooks and features
- **TypeScript** - Type-safe development experience
- **Tailwind CSS 4** - Utility-first CSS framework with Vite plugin
- **Vite 6** - Next-generation frontend tooling
- **Lucide React** - Modern icon library
- **ESLint** - Code quality and consistency

## Project Structure

```
src/
├── components/
│   ├── About/         # About section component
│   ├── Contact/       # Contact form and section
│   ├── Footer/        # Site footer
│   ├── Header/        # Navigation and header
│   ├── Hero/          # Hero section with video background
│   ├── Logo/          # Brand logo component
│   └── Services/      # Services showcase
├── hooks/
│   └── useScroll.tsx  # Custom scroll handling hook
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/RonsBodyShop.git
cd RonsBodyShop

# Install dependencies
npm install

# Create environment variables file
touch .env.local

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

## Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint for code quality checks
npm run lint
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
VITE_FORMSPREE_ID=your_formspree_id_here
```

## Building for Production

```bash
# TypeScript compilation and Vite build
npm run build

# Output will be in the /dist directory
```

The build process:
1. Compiles TypeScript (`tsc -b`)
2. Bundles and optimizes assets with Vite
3. Outputs production-ready files to `/dist`

## Deployment

The built site in `/dist` can be deployed to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any web server serving static files

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Ron's Body Shop. All rights reserved.

## Developer

Built by [Tobi Akoko](https://tobiakoko.com)
