# EasyPlug Community Hub - Design Prototype

## Project Overview
This is a **design prototype** of the EasyPlug Community Hub, a local marketplace platform built with React, TypeScript, and Material-UI. The application is a **frontend-only demonstration** that showcases the UI/UX design and user flows using mock data.

## Key Features (Demonstration Only)

### User Authentication
- Login/Registration screens with form validation
- Role-based access (User, Seller, Admin)
- **Note**: Authentication is simulated with dummy credentials

### Main Pages
- **Homepage**: Featured listings and categories
- **Category Pages**: Filtered product listings
- **Item Detail Pages**: Product information and seller details
- **User Profile**: Mock order history and account management
- **Seller Dashboard**: Sales analytics and inventory management (demo data)
- **Admin Dashboard**: Platform metrics and user management (demo data)

### Technical Implementation
- Built with React 18 and TypeScript
- UI Components from Material-UI and shadcn/ui
- Form handling with Formik and Yup validation
- Responsive design using CSS-in-JS (sx prop)
- Client-side routing with React Router

## Important Notes
- **No Backend Integration**: All data is hardcoded or stored in localStorage
- **Dummy Data**: All listings, user profiles, and analytics are for demonstration
- **Form Submissions**: Forms will simulate success but don't persist data
- **Authentication**: Uses localStorage to maintain session state

## Development Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Access the app at `http://localhost:5173`

## Design System
- **Colors**: Primary purple/indigo gradient (#667eea to #764ba2)
- **Typography**: System fonts with Material-UI typography scale
- **Spacing**: 8px base unit
- **Breakpoints**: Mobile-first responsive design

## Dummy Credentials
- User: user@example.com / user123
- Seller: seller@example.com / seller123
- Admin: admin@example.com / admin123

This prototype serves as a visual and interactive demonstration of the EasyPlug Community Hub concept, focusing on the user interface and experience design.
