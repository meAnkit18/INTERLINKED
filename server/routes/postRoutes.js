import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinaryConfig.js';
import { createPost, getAllPosts, getPostById, getUserPosts } from '../controllers/postController.js';
import { requireAuth } from '../middleware/authm.js';

const router = express.Router();
const upload = multer({ storage });

// ✅ Create a post (requires auth + image upload)
router.post('/', requireAuth, upload.single('image'), createPost);

// ✅ Get all posts
router.get('/', getAllPosts);

// ✅ Get posts for a specific user
router.get('/user/:userId', getUserPosts);

// ✅ Get post by ID (dynamic route at the end!)
router.get('/:id', getPostById);

export default router;
