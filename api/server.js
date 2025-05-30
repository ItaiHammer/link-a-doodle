import express from 'express';
import dotenv from 'dotenv';
import urlRoutes from './routes/urlRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
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
app.use('/api/analytics', analyticsRoutes);

app.set('trust proxy', true);

// Production: Serve React build files
if (!isDev) {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
}

// Short link redirect — ONLY if ID is valid
app.get('/:key', async (req, res) => {
  const { key } = req.params;

  try {
    const link = await Link.findOne({ key });

    if (!link) return res.redirect('/error'); 

    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip;

    const response = await fetch(`https://freeipapi.com/api/json/${ip}`);
    const locationData = await response.json();

    // Rounds coordinates to 1 decimal place
    const latitude = Math.round(locationData.latitude * 10) / 10;
    const longitude = Math.round(locationData.longitude * 10) / 10;

    const location = {
      country: locationData.countryName,
      region: locationData.regionName,
      city: locationData.cityName,
      latitude,
      longitude
    }

    link.clicks.push({ timestamp: new Date(), location });
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
} else {
  // Production: redirect `/` to React build
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

// Production: catch-all to let React Router handle frontend routes
if (!isDev) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

// Connect to database and start server
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
