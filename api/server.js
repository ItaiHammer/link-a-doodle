import express from 'express';
import dotenv from 'dotenv';
import urlRoutes from './routes/urlRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors';
import Link from './models/Link.js'; // Make sure this import exists!
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root, not just /api
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV === 'development';
const MONGO_URI = process.env.MONGO_URI;

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

// API routes
app.use('/api/url', urlRoutes);

// Production: Serve React build files
if (!isDev) {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
}

// Short link redirect — ONLY if ID is valid
app.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  // Optional: check format if you want (e.g., only 4-8 alphanumeric chars)
  if (id.length > 12 || id.includes('/')) return next();

  try {
    const link = await Link.findOne({ key: id });

    if (!link) return next(); // Not found, fallback to frontend route

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    link.clicks.push({ timestamp: new Date(), ip });
    await link.save();

    return res.redirect(link.redirectUrl);
  } catch (error) {
    return res.status(500).json({ error: 'Server Error' });
  }
});

// In development, redirect `/` to React dev server
if (isDev) {
  app.get('/', (req, res) => {
    res.redirect('http://localhost:3000');
  });
}

// Production: catch-all to let React Router handle frontend routes
if (!isDev) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

// Start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connected and server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Database connection error: ' + error);
  });
