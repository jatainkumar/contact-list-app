# Contact List Backend API

Simple Express.js backend for the Contact List application.

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/login` - Login user
  - Body: `{ "email": "demo@example.com", "password": "any" }`

### Contacts
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get single contact
- `POST /api/contacts` - Create new contact
  - Body: `{ "name": "John Doe", "email": "john@example.com", "phone": "+1234567890", "company": "Company" }`
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

### Health Check
- `GET /api/health` - Check server status

## Database

Data is stored in `db.json` file. The file is automatically created on first run with sample data.

## CORS

CORS is enabled for all origins. In production, configure it to allow only your frontend domain.
