# Pizzeria NU - React + Vite + Tailwind CSS

```
/src
  /assets         # Static assets like images
  /components     # Reusable React components
    - Header.jsx  # Site navigation with mobile menu
    - Hero.jsx    # Hero section
    - Menu.jsx    # Pizza menu with category filtering
    - About.jsx   # About us section
    - Testimonials.jsx # Customer testimonials with carousel
    - ContactForm.jsx # Contact form with validation
    - Footer.jsx  # Site footer
    - Cart.jsx    # Shopping cart functionality
    - CheckoutForm.jsx # Checkout form with validation
    - Notification.jsx # Notification system
  /context        # React context
    - CartContext.jsx # Cart state management
  App.jsx         # Main App component
  main.jsx        # Application entry point
  index.css       # Global styles
```

This is a modern pizza restaurant website built with:
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS 3.4.0](https://tailwindcss.com/)

## Features

- Responsive design for all devices
- Modern UI with Tailwind CSS
- Component-based architecture
- Fast development with Vite
- Shopping cart functionality with item count display
- Checkout form with validation
- Notification system with auto-dismiss
- Responsive testimonials with carousel for mobile
- Menu with category filtering (Classic, Specialty, Vegetarian)
- Smooth scrolling navigation
- Contact form with validation

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd pizzeria-nu
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
/src
  /assets         # Static assets like images
  /components     # Reusable React components
    - Header.jsx  # Site navigation with mobile menu
    - Hero.jsx    # Hero section
    - Menu.jsx    # Pizza menu
    - About.jsx   # About us section
    - Testimonials.jsx # Customer testimonials
    - ContactForm.jsx # Contact form with validation
    - Footer.jsx  # Site footer
  App.jsx         # Main App component
  main.jsx        # Application entry point
```

## Building for Production

To build the app for production, run:

```bash
npm run build
```

This will generate optimized files in the `dist` directory.

## License

MIT

## Acknowledgments

- Design inspiration from various pizza restaurant websites
- Images from Unsplash+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
