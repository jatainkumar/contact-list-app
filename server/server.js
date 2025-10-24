import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import Contact from './models/Contact.js';
import User from './models/User.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
let dbConnected = false;
connectDB().then(connected => {
  dbConnected = connected;
  if (connected) {
    initializeData();
  }
});

// Initialize sample data
async function initializeData() {
  try {
    // Check if demo user exists
    const demoUser = await User.findOne({ email: 'demo@example.com' });
    if (!demoUser) {
      await User.create({
        email: 'demo@example.com',
        name: 'Demo User',
        password: 'demo123'
      });
      console.log('✅ Demo user created');
    }

    // Check if contacts exist
    const contactCount = await Contact.countDocuments();
    if (contactCount === 0) {
      const sampleContacts = [
        {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@techcorp.com',
          phone: '+1 (555) 123-4567',
          company: 'TechCorp Solutions'
        },
        {
          name: 'Michael Chen',
          email: 'mchen@innovatelab.io',
          phone: '+1 (555) 234-5678',
          company: 'InnovateLab'
        },
        {
          name: 'Emily Rodriguez',
          email: 'emily.r@designstudio.com',
          phone: '+1 (555) 345-6789',
          company: 'Creative Design Studio'
        }
      ];
      
      await Contact.insertMany(sampleContacts);
      console.log('✅ Sample contacts created');
    }
  } catch (error) {
    console.error('Error initializing data:', error.message);
  }
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    database: dbConnected ? 'connected' : 'disconnected'
  });
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!dbConnected) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // For demo purposes, accept any password for demo user
    // In production, use proper password hashing (bcrypt)
    if (email === 'demo@example.com' || user.password === password) {
      res.json({
        id: user._id,
        email: user.email,
        name: user.name
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    if (!dbConnected) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Get single contact
app.get('/api/contacts/:id', async (req, res) => {
  try {
    if (!dbConnected) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

// Create contact
app.post('/api/contacts', async (req, res) => {
  try {
    if (!dbConnected) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    
    const newContact = new Contact(req.body);
    await newContact.save();
    
    res.status(201).json(newContact);
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// Update contact
app.put('/api/contacts/:id', async (req, res) => {
  try {
    if (!dbConnected) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// Delete contact
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    if (!dbConnected) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

// Start server (only in development)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoints:`);
    console.log(`  GET    /api/health`);
    console.log(`  POST   /api/login`);
    console.log(`  GET    /api/contacts`);
    console.log(`  POST   /api/contacts`);
    console.log(`  GET    /api/contacts/:id`);
    console.log(`  PUT    /api/contacts/:id`);
    console.log(`  DELETE /api/contacts/:id`);
  });
}

// Export for Vercel serverless
export default app;
