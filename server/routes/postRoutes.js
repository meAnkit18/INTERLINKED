import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinaryConfig.js';
import * as postController from '../controllers/postController.js';
import { requireAuth } from '../middleware/authm.js';

const router = express.Router();
const upload = multer({ storage });

router.post('/', requireAuth, upload.single('image'), postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.get('/user/:userId', postController.getUserPosts);

router.post('/:id/upvote', requireAuth, postController.upvotePost);

router.post('/:id/downvote', requireAuth, postController.downvotePost);


export default router;
