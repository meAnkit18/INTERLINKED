import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import uploadRouter from './routes/uploadRouter.js';
import postRoutes from './routes/postRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "https://interlinked-beta.vercel.app",
  "https://interlinked-1.onrender.com"   // ✅ added
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// ✅ Fix COOP warning
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRouter);
app.use('/api/posts', postRoutes);
app.use('/api', leaderboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
