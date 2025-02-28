import express from "express";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js";

dotenv.config();

const app = express();
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(express.json());

app.use("/api/url", urlRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
