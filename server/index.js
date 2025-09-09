import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import uploadRouter from './routes/uploadRouter.js'
import postRoutes from './routes/postRoutes.js'
import leaderboardRoutes from './routes/leaderboardRoutes.js'

dotenv.config();
const app = express();
app.use(cors(
{
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}
));
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes)
app.use('/api/upload',uploadRouter)
app.use('/api/posts', postRoutes)
app.use('/api', leaderboardRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
