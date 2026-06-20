# OctoFit Tracker - Modern Multi-Tier Application

A comprehensive fitness tracking application built with React 19, Node.js/Express, TypeScript, and MongoDB.

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .env
├── backend/           # Express + TypeScript backend API
│   ├── src/
│   │   ├── server.ts
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── routes/
│   │   ├── models/
│   ├── dist/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
└── README.md
```

## Ports Configuration

- **Frontend (Vite)**: `5173`
- **Backend (Express)**: `8000`
- **MongoDB**: `27017`

## Prerequisites

- Node.js v18+ and npm v9+
- MongoDB running locally or remote connection string

## Installation & Setup

### Backend Setup

```bash
cd octofit-tracker/backend

# Install dependencies
npm install

# Build TypeScript
npm run build

# Start development server (with hot reload)
npm run dev

# Or start production build
npm start
```

**Backend Configuration** (`.env`):
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
NODE_ENV=development
```

### Frontend Setup

```bash
cd octofit-tracker/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

**Frontend Configuration** (`.env`):
```env
VITE_API_URL=http://localhost:8000
VITE_ENVIRONMENT=development
```

## Technology Stack

### Frontend
- **React 19** - UI Framework
- **Vite** - Build tool and dev server
- **JavaScript/TypeScript** - Primary language

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Database
- **MongoDB** - NoSQL database with Mongoose ODM

## Development Workflow

1. **Start MongoDB** (ensure it's running on port 27017)
2. **Start Backend**: `npm run dev` in `/backend` (runs on port 8000)
3. **Start Frontend**: `npm run dev` in `/frontend` (runs on port 5173)
4. Access the application at `http://localhost:5173`

## API Health Check

Once the backend is running, check the health status:
```bash
curl http://localhost:8000/api/health
```

Expected response:
```json
{
  "status": "OctoFit Tracker Backend is running!",
  "timestamp": "2026-06-20T14:30:00.000Z"
}
```

## Building for Production

### Backend
```bash
cd octofit-tracker/backend
npm run build
npm start
```

### Frontend
```bash
cd octofit-tracker/frontend
npm run build
# Output in dist/ directory
```

## Project Features

- ✅ React 19 with Vite for fast development
- ✅ TypeScript for type safety
- ✅ Express.js RESTful API
- ✅ MongoDB integration with Mongoose
- ✅ Hot module replacement (HMR) in development
- ✅ CORS enabled for cross-origin requests
- ✅ Environment variable management
- ✅ Production-ready build scripts

## Next Steps

1. Define MongoDB schemas in `/backend/src/models/`
2. Create API routes in `/backend/src/routes/`
3. Build React components in `/frontend/src/components/`
4. Connect frontend to backend API

## License

ISC
