# Judix Frontend - Legal Case Management System

A modern, scalable web application built with Next.js 16 for managing legal cases with authentication, dashboard functionality, and comprehensive CRUD operations.

## 🚀 Live Demo

[Demo Link] - *Add your deployed link here*

## 📋 Assignment Overview

This frontend application was developed as part of a Full-Stack Developer Intern assignment, featuring:
- **Framework**: Next.js 16 with TypeScript
- **Styling**: TailwindCSS v4 with shadcn/ui components
- **Authentication**: JWT-based with protected routes
- **Form Management**: React Hook Form with Zod validation
- **State Management**: Modern React patterns with custom hooks
- **API Integration**: Axios for backend communication

## ✨ Features

### 🔐 Authentication System
- **User Registration** with client-side validation
- **Login/Logout** with JWT token management
- **Protected Routes** - Dashboard accessible only after authentication
- **Profile Management** - Update user information and bio

### 📊 Dashboard Features
- **User Profile Display** - Fetched from backend API
- **Case Management** - Full CRUD operations
- **Search & Filter** - Real-time case filtering
- **Responsive Design** - Optimized for all device sizes
- **Status Management** - Draft, Active, Closed case statuses

### 📋 Case Management
- **Create Cases** - Comprehensive case creation form
- **Edit Cases** - In-place editing with validation
- **Case Types** - Civil, Criminal, Contract, Corporate, Other
- **Client Information** - Name and email management
- **Archive System** - Soft delete functionality

### 🎨 UI/UX Features
- **Modern Interface** - Clean, professional design
- **Dark/Light Theme** - Theme switching capability
- **Toast Notifications** - User feedback with Sonner
- **Loading States** - Proper loading indicators
- **Error Handling** - Comprehensive error management

## 🛠️ Tech Stack

### Core Technologies
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 19** - Latest React features
- **TailwindCSS v4** - Utility-first CSS framework

### UI Components & Libraries
- **shadcn/ui** - High-quality component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript Config** - Strict type checking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running (separate repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShadowAdi/judix-frontend.git
   cd judix-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
judix-frontend/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── login/                   # Authentication pages
│   ├── register/
│   ├── dashboard/               # Protected dashboard
│   └── cases/[id]/             # Dynamic case routes
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── CaseCard.tsx            # Case display component
│   ├── CaseForm.tsx            # Case creation form
│   ├── EditCaseForm.tsx        # Case editing form
│   ├── ProfileUpdateModal.tsx   # Profile management
│   └── ProtectedRoute.tsx      # Route protection
├── lib/                         # Utility functions
│   ├── auth.ts                 # Authentication helpers
│   ├── types.ts                # TypeScript interfaces
│   ├── utils.ts                # General utilities
│   └── status-case.ts          # Case status management
├── public/                      # Static assets
└── Configuration files
    ├── components.json          # shadcn/ui config
    ├── next.config.ts          # Next.js config
    ├── tailwind.config.js      # TailwindCSS config
    └── tsconfig.json           # TypeScript config
```

## 🔗 API Integration

The frontend integrates with a backend API for:

### Authentication Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile

### Case Management Endpoints
- `GET /cases` - Fetch all user cases
- `POST /cases` - Create new case
- `GET /cases/:id` - Get specific case
- `PUT /cases/:id` - Update case
- `DELETE /cases/:id` - Delete case

### Authentication Flow
1. User registers/logs in
2. JWT token stored in localStorage
3. Token included in API requests via Axios interceptors
4. Protected routes check authentication status
5. Auto-logout on token expiration

## 🎯 Core Components

### Authentication Components
- **Login Form** - Email/password with validation
- **Register Form** - Username, email, password, bio
- **Protected Route** - HOC for route protection

### Dashboard Components
- **Case Cards** - Display case information
- **Case Form** - Create/edit cases with validation
- **Profile Modal** - Update user information
- **Search Filter** - Real-time case filtering

### UI Components (shadcn/ui)
- **Button** - Various button styles and states
- **Card** - Consistent card layouts
- **Form** - Form field components
- **Input/Textarea** - Form input elements
- **Select** - Dropdown selections
- **Toast** - Notification system

## 🔒 Security Features

- **Client-side Validation** - Zod schema validation
- **Protected Routes** - Authentication required
- **JWT Token Management** - Secure token handling
- **XSS Protection** - Input sanitization
- **CSRF Protection** - Built-in Next.js protection

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Intermediate screen sizes
- **Desktop** - Full desktop experience
- **Touch Friendly** - Optimized touch targets

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Deployment Options
- **Vercel** - Recommended for Next.js
- **Netlify** - Static site deployment
- **Railway** - Full-stack deployment
- **Docker** - Containerized deployment

### Environment Variables (Production)
```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
NEXT_PUBLIC_APP_URL=https://your-frontend-domain.com
```

## 🔄 Scalability Considerations

### Frontend Architecture
- **Component Modularity** - Reusable, composable components
- **Custom Hooks** - Shared logic extraction
- **Type Safety** - Comprehensive TypeScript usage
- **Code Splitting** - Next.js automatic optimization

### Performance Optimizations
- **Image Optimization** - Next.js built-in optimization
- **Bundle Splitting** - Automatic code splitting
- **Caching Strategy** - API response caching
- **Lazy Loading** - Component-based lazy loading

### Future Enhancements
- **State Management** - Redux Toolkit or Zustand
- **Real-time Updates** - WebSocket integration
- **PWA Features** - Offline functionality
- **Testing Suite** - Jest and Testing Library
- **Internationalization** - Multi-language support

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📖 API Documentation

For backend API documentation, please refer to the backend repository or Postman collection.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Assignment Completion Checklist

### ✅ Frontend Requirements
- [x] Built with Next.js (preferred framework)
- [x] Responsive design using TailwindCSS
- [x] Forms with client-side validation
- [x] Protected routes (login required for dashboard)
- [x] Modern React patterns and hooks

### ✅ Dashboard Features
- [x] Display user profile (fetched from backend)
- [x] CRUD operations on cases entity
- [x] Search and filter UI
- [x] Logout flow
- [x] Professional UI/UX design

### ✅ Security & Integration
- [x] JWT authentication integration
- [x] Error handling & validation
- [x] Code structured for easy scaling
- [x] API integration with backend

### ✅ Technical Excellence
- [x] TypeScript for type safety
- [x] Modern component architecture
- [x] Responsive design principles
- [x] Professional code organization

