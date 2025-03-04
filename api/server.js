import express from 'express';
import dotenv from 'dotenv';
import urlRoutes from './routes/urlRoutes.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/url", urlRoutes);

const PORT = process.env.PORT;
const isDev = process.env.NODE_ENV === "development";
const MONGO_URI = process.env.MONGO_URI;

// root: website
if (isDev) {
    app.get("/", (req, res) => {
      res.redirect("http://localhost:3000");
    });
  }
  // otherwise nginx will serve the static files
  
  // redirect url
  app.get("/:key", (req, res) => {
    const key = req.params.key;
  
    res.send(`Got key: ${key}`);
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
    });

