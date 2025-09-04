import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import uploadRouter from './routes/uploadRouter.js'

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

app.use('/api/auth', authRoutes)
app.use('/api/upload',uploadRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
