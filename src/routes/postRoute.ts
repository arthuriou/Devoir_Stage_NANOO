import express from 'express';
import { PostController } from '../controllers/postControllers';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/create-post', authenticate, PostController.createPost);

export default router;