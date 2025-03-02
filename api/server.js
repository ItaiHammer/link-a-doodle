import express from 'express';
import dotenv from 'dotenv';
import urlRoutes from './routes/urlRoutes.js';
import mongoose from 'mongoose';
import path from 'path';

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/url", urlRoutes);

const PORT = process.env.PORT;
const isDev = process.env.NODE_ENV === 'development';
const MONGO_URI = process.env.MONGO_URI;

app.get("/", (req, res) => {
    if (isDev) {
        res.redirect("http://localhost:3000");
    } else {
        res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
    }
});

mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Database connection is ready and " 
            + `server running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log("An error occurred while connecting to the database: " + error);    
    })

