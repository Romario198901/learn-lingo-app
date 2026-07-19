# Learn Lingo App

A modern React + TypeScript + Vite application for learning languages with teachers, bookings, and personalized favorites. Built with Firebase for authentication and data management, and React Query for efficient server state management.

## 🎯 Features

- **Authentication**: Email/password authentication powered by Firebase
- **Teachers Catalog**: Browse and filter available language teachers
- **Booking System**: Schedule lessons with your preferred teachers
- **Favorites**: Save and manage your favorite teachers
- **Responsive UI**: Mobile-friendly design with CSS Modules
- **Real-time Data**: Firebase integration for live updates
- **Form Validation**: Robust form handling with React Hook Form and Yup schemas

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2 with TypeScript
- **Build Tool**: Vite 8.1
- **State Management**: React Query 5.101
- **Authentication & Database**: Firebase 12.15
- **Routing**: React Router 7.18
- **Form Management**: React Hook Form 7.80 + Yup validators
- **HTTP Client**: Axios 1.18
- **UI Components**: React Select, React Loader Spinner
- **Styling**: CSS Modules + Modern Normalize
- **Code Quality**: ESLint + TypeScript compiler
- **Compiler Optimization**: Babel React Compiler

## 📁 Project Structure

```
src/
├── api/                      # Firebase and REST API configuration
│   ├── firebase.ts          # Firebase initialization
│   └── firebaseRest.ts      # Firebase REST API client
├── components/              # Reusable React components
│   ├── auth/               # Authentication forms (Login, Registration)
│   ├── layout/             # Layout components (Header, Navigation, UserMenu)
│   ├── home/               # Home page components (Hero, Statistics)
│   ├── teachers/           # Teacher-related components (TeacherCard, TeachersList)
│   ├── BookingForm/        # Booking form component
│   ├── Loader/             # Loading spinner
│   └── ui/                 # Reusable UI elements (Button, Input, Modal, Select, Container)
├── context/                # React Context for global state
│   ├── authContext.ts      # Authentication context definition
│   └── AuthProvider.tsx    # Authentication provider component
├── hooks/                  # Custom React hooks
│   ├── useAuth.ts         # Authentication hook
│   ├── useCreateBooking.ts # Booking creation hook
│   ├── useTeachers.ts     # Teachers data hook
│   └── favorites/         # Favorite teachers hooks
├── pages/                  # Page components
│   ├── HomePage.tsx       # Home page
│   ├── TeachersPage.tsx   # Teachers listing page
│   └── FavoritesPage.tsx  # Favorites page
├── routes/                # Routing utilities
│   └── PrivateRoute.tsx   # Protected route component
├── schemas/               # Validation schemas
│   ├── authSchemas.ts     # Auth form validation
│   └── bookingSchema.ts   # Booking form validation
├── services/              # API service functions
│   ├── auth/             # Authentication services
│   ├── booking/          # Booking services
│   ├── favorites/        # Favorites services
│   └── teachers/         # Teachers data services
├── types/                # TypeScript type definitions
│   ├── auth.ts          # Auth-related types
│   ├── authForms.ts     # Auth form types
│   ├── booking.ts       # Booking types
│   └── teacher.ts       # Teacher types
├── utils/               # Utility functions
│   └── queryClient.ts   # React Query client configuration
├── constants/           # Application constants
│   ├── booking.ts       # Booking constants
│   ├── navigation.ts    # Navigation routes
│   └── routes.ts        # Route definitions
└── App.tsx              # Main App component
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Firebase project with authentication enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learn-lingo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with your Firebase project credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

   You can find these values in your Firebase project settings console.

### Available Scripts

- **`npm run dev`** - Start the development server (localhost:5173)
- **`npm run build`** - Build the application for production with type checking
- **`npm run lint`** - Run ESLint to check code quality
- **`npm run preview`** - Preview the production build locally

## 📋 Development Guide

### Authentication Flow

- User registration/login through Firebase authentication
- Auth state managed via React Context (`authContext.ts`)
- Protected routes using `PrivateRoute` component
- Auth hook (`useAuth.ts`) for accessing user state throughout the app

### Data Fetching

- Server state management via React Query
- API calls through custom hooks and service functions
- Optimistic updates and caching for better UX

### Form Handling

- Form validation using Yup schemas
- React Hook Form for efficient form state management
- Custom validation schemas in `schemas/` directory

### Styling

- CSS Modules for component-scoped styling
- No global CSS pollution
- Responsive design patterns

## 🔄 Data Models

### Teacher
- ID, name, description, languages, specialization, experience level, rating, etc.

### Booking
- User ID, teacher ID, date, time, lesson details

### User (Auth)
- Email, password, display name, preferences

## 🤝 Contributing

This is a personal project for learning purposes. Feel free to fork and experiment!

## 📝 Notes

- The app uses Firebase Realtime Database for data persistence
- React Query manages server state with automatic caching and synchronization
- All forms include client-side validation before submission
- The app is optimized with React Compiler for better performance
- If you hit issues starting the dev server, run `npm install` and ensure your Node version is compatible (Node 16+ recommended)

## 📄 License

Personal project - All rights reserved


