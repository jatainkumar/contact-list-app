import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DB_FILE = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database file if it doesn't exist
async function initDB() {
  try {
    await fs.access(DB_FILE);
  } catch {
    const initialData = {
      users: [
        {
          id: '1',
          email: 'demo@example.com',
          name: 'Demo User',
          password: 'demo123'
        }
      ],
      contacts: [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@techcorp.com',
          phone: '+1 (555) 123-4567',
          company: 'TechCorp Solutions',
          createdAt: new Date('2024-01-15').toISOString()
        },
        {
          id: '2',
          name: 'Michael Chen',
          email: 'mchen@innovatelab.io',
          phone: '+1 (555) 234-5678',
          company: 'InnovateLab',
          createdAt: new Date('2024-02-20').toISOString()
        },
        {
          id: '3',
          name: 'Emily Rodriguez',
          email: 'emily.r@designstudio.com',
          phone: '+1 (555) 345-6789',
          company: 'Creative Design Studio',
          createdAt: new Date('2024-03-10').toISOString()
        }
      ]
    };
    await fs.writeFile(DB_FILE, JSON.stringify(initialData, null, 2));
    console.log('Database initialized');
  }
}

// Read database
async function readDB() {
  const data = await fs.readFile(DB_FILE, 'utf-8');
  return JSON.parse(data);
}

// Write database
async function writeDB(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await readDB();
    
    const user = db.users.find(u => u.email === email);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // For demo purposes, accept any password for demo user
    // In production, use proper password hashing
    if (email === 'demo@example.com' || user.password === password) {
      res.json({
        id: user.id,
        email: user.email,
        name: user.name
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const db = await readDB();
    res.json(db.contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Get single contact
app.get('/api/contacts/:id', async (req, res) => {
  try {
    const db = await readDB();
    const contact = db.contacts.find(c => c.id === req.params.id);
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

// Create contact
app.post('/api/contacts', async (req, res) => {
  try {
    const db = await readDB();
    const newContact = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    db.contacts.push(newContact);
    await writeDB(db);
    
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// Update contact
app.put('/api/contacts/:id', async (req, res) => {
  try {
    const db = await readDB();
    const index = db.contacts.findIndex(c => c.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    db.contacts[index] = {
      ...db.contacts[index],
      ...req.body,
      id: req.params.id
    };
    
    await writeDB(db);
    res.json(db.contacts[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// Delete contact
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const db = await readDB();
    const index = db.contacts.findIndex(c => c.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    db.contacts.splice(index, 1);
    await writeDB(db);
    
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

// Start server
async function startServer() {
  await initDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API endpoints:`);
    console.log(`  GET    /api/health`);
    console.log(`  POST   /api/login`);
    console.log(`  GET    /api/contacts`);
    console.log(`  POST   /api/contacts`);
    console.log(`  GET    /api/contacts/:id`);
    console.log(`  PUT    /api/contacts/:id`);
    console.log(`  DELETE /api/contacts/:id`);
  });
}

startServer();
