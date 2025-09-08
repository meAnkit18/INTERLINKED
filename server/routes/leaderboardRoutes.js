import express from 'express';
import { getLeaderboard, getTrendingCategories } from '../controllers/leaderboardController.js';

const router = express.Router();

router.get('/leaderboard', getLeaderboard);
router.get('/trending-categories', getTrendingCategories);

export default router;
