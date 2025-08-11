import express from 'express'
import { CommentControllers } from '../controllers/CommentController';
import { authenticate } from '../middlewares/authMiddleware';


const router = express.Router();

router.post('/create-comment', authenticate, CommentControllers.createComment);

export default router;