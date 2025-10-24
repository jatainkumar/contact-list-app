# Contact List Application

A modern, full-stack contact management app built with React, Node.js, and Express.

**Live Demo:** [contact-app-jatain.vercel.app](https://contact-app-jatain.vercel.app)

## Features

- 🔐 **Login System** - Demo login with authentication
- 📇 **Contact Management** - Add, view, search, and delete contacts
- 🌍 **International Phone Numbers** - Country code selector with 36+ countries
- 🔍 **Real-time Search** - Instant contact filtering
- 💾 **Persistent Storage** - Backend API with JSON database
- 📱 **Responsive Design** - Works on all devices
- ♿ **Accessible** - WCAG AA compliant

## Tech Stack

**Frontend:**
- React 18 with Hooks
- Tailwind CSS
- Vite

**Backend:**
- Node.js & Express
- JSON file database
- RESTful API

## Quick Start

### 1. Install Dependencies

```bash
# Frontend
npm install

# Backend
cd server
npm install
cd ..
```

### 2. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm start
```
Backend runs on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

### 3. Login

Click **"Try Demo Login (Click Here!)"** button to access the app instantly.

Or manually login with:
- Email: any valid email
- Password: any 6+ characters

## API Endpoints

```
POST   /api/login              - User login
GET    /api/contacts           - Get all contacts
POST   /api/contacts           - Create contact
PUT    /api/contacts/:id       - Update contact
DELETE /api/contacts/:id       - Delete contact
```

## Project Structure

```
contact-list-app/
├── src/
│   ├── components/         # React components
│   ├── hooks/             # Custom hooks
│   ├── services/          # API service
│   └── utils/             # Utility functions
├── server/
│   ├── server.js          # Express backend
│   └── db.json            # JSON database
└── public/                # Static assets
```

## Development

```bash
# Frontend with hot reload
npm run dev

# Backend with auto-reload
cd server
npm run dev

# Build for production
npm run build
```

## Database

Data is stored in `server/db.json` and automatically created with sample contacts on first run.

## Deployment

**Frontend:** Deploy `dist` folder to Vercel, Netlify, or any static host  
**Backend:** Deploy to Heroku, Railway, Render, or any Node.js host

Update `src/services/api.js` with your production API URL.

## License

MIT

---

Built with ❤️ using React, JavaScript, and Tailwind CSS
