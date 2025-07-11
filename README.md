# PesaFit

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.16.2-green.svg)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.11-38B2AC.svg)](https://tailwindcss.com/)

A comprehensive finance, expense tracker, and budgeting application built with modern web technologies. PesaFit helps users track their income, expenses, and overall financial health with detailed analytics and visualizations.

## Features

- **Authentication**: User registration, login, and JWT-based security
- **Financial Tracking**: Income and expense management with categories
- **Analytics**: Dashboard with charts, recent transactions, and time-based analysis
- **Data Export**: Excel export functionality for financial reports
- **Responsive Design**: Mobile-friendly interface with modern UI

## Tech Stack

### Frontend
- React 19.1.0, Vite 7.0.0, TailwindCSS 4.1.11
- React Router DOM 7.6.3, Axios 1.10.0
- Recharts 3.0.2, React Icons 5.5.0, React Hot Toast 2.5.2

### Backend
- Node.js, Express 5.1.0, MongoDB 8.16.2
- Mongoose 8.16.2, JWT 9.0.2, bcryptjs 3.0.2
- Multer 2.0.1, xlsx 0.18.5, CORS 2.8.5

## Architecture & Structure
### Frontend Architecture
```
frontend/src/
├── components/          # Reusable UI components
│   ├── Cards/          # Card components for displaying data
│   ├── Charts/         # Chart components (Line, Bar, Pie)
│   ├── Dashboard/      # Dashboard-specific components
│   ├── Expense/        # Expense-related components
│   ├── Income/         # Income-related components
│   ├── inputs/         # Form input components
│   └── layouts/        # Layout components
├── context/            # React Context for state management
├── hooks/              # Custom React hooks
├── pages/              # Main application pages
│   ├── Auth/           # Authentication pages
│   └── Dashboard/      # Dashboard pages
├── utils/              # Utility functions and configurations
└── assets/             # Static assets
```

### Backend Architecture
```
backend/
├── config/             # Configuration files (database, etc.)
├── controllers/        # Business logic handlers
├── middleware/         # Custom middleware (auth, upload)
├── models/             # MongoDB schemas
├── routes/             # API route definitions
├── uploads/            # File upload directory
└── server.js           # Main server entry point
```

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local instance or MongoDB Atlas)
- Git

### Installation

1. **Clone and setup**
   ```bash
   git clone <repository-url>
   cd PesaFit_v1
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Install MongoDB (if needed)
   chmod +x install_mongodb.sh
   ./install_mongodb.sh
   
   # Create .env file
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

### Environment Configuration

Create `.env` file in backend directory:
```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/pesafit
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:3000
```

### Running the Application

1. **Start Backend**
   ```bash
   cd backend
   npm run dev
   # Server runs on http://localhost:8080
   ```

2. **Start Frontend**
   ```bash
   cd frontend
   npm run dev
   # App opens on http://localhost:3000
   ```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/getUser` - Get user profile

### Financial Data
- `POST /api/v1/income/add` - Add income entry
- `GET /api/v1/income/get` - Get all income entries
- `POST /api/v1/expense/add` - Add expense entry
- `GET /api/v1/expense/get` - Get all expense entries
- `GET /api/v1/dashboard` - Get dashboard data

## Database Schema


## Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
```

### Backend
```bash
npm start        # Start production server
npm run dev      # Start development server
```