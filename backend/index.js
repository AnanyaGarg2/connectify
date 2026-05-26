import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import noteRoutes from "./routes/note.route.js";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // Logging Middleware

const port = process.env.PORT || 4001;

app.get('/', (req, res) => {
    res.send("Hello World");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Routing Middleware
app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/auth", authRoutes);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});