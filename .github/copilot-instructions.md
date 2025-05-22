<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Pizzeria NU - Development Guide

This is a Vite React project for a pizza restaurant website using Tailwind CSS 3.4.0.

## Project Overview
- Frontend built with React.js and Vite
- Styling with Tailwind CSS 3.4.0
- Component-based structure with reusable UI elements

## Component Structure
- `Header.jsx` - Navigation with responsive mobile menu
- `Hero.jsx` - Main landing section with call-to-action buttons
- `Menu.jsx` - Displays pizza menu items with images, prices, and category filtering
- `About.jsx` - Company history and mission statement
- `Testimonials.jsx` - Customer reviews with responsive carousel
- `ContactForm.jsx` - Contact form with validation
- `Footer.jsx` - Site footer with contact information and social links
- `Cart.jsx` - Shopping cart functionality
- `CheckoutForm.jsx` - Checkout form with validation
- `Notification.jsx` - Notification system with auto-dismiss

## Development Guidelines
- Follow React best practices for component composition
- Use Tailwind CSS for styling (avoid custom CSS when possible)
- Maintain responsive design for all screen sizes
- Follow the established color themes:
  - Primary: indigo-600, red-600
  - Secondary: orange-500, gray-900
  - Accent colors: red-500, yellow-400
  - Backgrounds: white, gray-50, gray-100

## Styling Guide
- Use Tailwind utility classes instead of custom CSS
- Maintain accessibility with proper contrast ratios
- Use responsive prefixes (sm:, md:, lg:, xl:) to ensure proper display on all devices
- Follow a consistent color scheme throughout the site

## Future Enhancements
- Improve the shopping cart functionality with persistent storage
- Connect contact form to a backend server
- Create an admin dashboard for menu management
- Add authentication for user accounts
- Implement a reservation system for dine-in
