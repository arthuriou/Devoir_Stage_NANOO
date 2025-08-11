import express from 'express';
import { PostController } from '../controllers/postController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/create-post', authenticate, PostController.createPost);
router.patch('/edit-post/:id', authenticate, PostController.editPost);
router.delete('/delete-post/:id', authenticate, PostController.deletePost);
router.get('/get-post/:id', authenticate, PostController.getPostById);

export default router;