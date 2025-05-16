import express from 'express';
import dotenv from 'dotenv';
import urlRoutes from './routes/urlRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors';  // Importing cors

dotenv.config();

const app = express();

// Enabling CORS for all origins (or specify 'http://localhost:3000' to restrict to React app)
app.use(cors({
  origin: 'http://localhost:3000',  // Replace with your React app's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed HTTP methods
}));

app.use(express.json());

app.use('/api/url', urlRoutes);

const PORT = process.env.PORT || 5000;  // Default to 5000 if no PORT in environment variables
const isDev = process.env.NODE_ENV === 'development';
const MONGO_URI = process.env.MONGO_URI;

// Root: website (redirect to frontend in development mode)
if (isDev) {
    app.get('/', (req, res) => {
        res.redirect('http://localhost:3000');
    });
}

// Otherwise nginx will serve static files

mongoose
    .connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(
                'Database connection is ready and ' +
                    `server running on port ${PORT}`
            );
        });
    })
    .catch((error) => {
        console.log(
            'An error occurred while connecting to the database: ' + error
        );
    });
