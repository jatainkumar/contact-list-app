# Contact List App - Setup Guide

This application consists of a React frontend and a Node.js backend.

## Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

## Installation

### 1. Install Frontend Dependencies

```bash
# From the project root
npm install
```

### 2. Install Backend Dependencies

```bash
# Navigate to server folder
cd server
npm install
cd ..
```

## Running the Application

You need to run both the backend and frontend servers.

### Option 1: Run in Separate Terminals

**Terminal 1 - Backend Server:**
```bash
cd server
npm start
```
The backend will run on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
# From project root
npm run dev
```
The frontend will run on `http://localhost:5173`

### Option 2: Development Mode (Auto-reload)

**Backend with auto-reload:**
```bash
cd server
npm run dev
```

## Using the Application

1. Open your browser to `http://localhost:5173`
2. Click "Try Demo Login (Click Here!)" button
3. You'll see the contacts page with data from the backend
4. Add, delete, and search contacts - all changes are saved to the backend!

## API Endpoints

The backend provides these endpoints:

- `POST /api/login` - User login
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

## Database

Data is stored in `server/db.json` file. This file is automatically created with sample data on first run.

## Troubleshooting

### Port Already in Use

If port 3001 is already in use, edit `server/server.js` and change the PORT variable.

### CORS Errors

Make sure the backend server is running before starting the frontend.

### Connection Refused

Ensure both servers are running and check the console for any error messages.

## Production Deployment

For production:
1. Update `src/services/api.js` to use your production API URL
2. Build the frontend: `npm run build`
3. Deploy the `dist` folder to a static hosting service
4. Deploy the backend to a Node.js hosting service (Heroku, Railway, etc.)
