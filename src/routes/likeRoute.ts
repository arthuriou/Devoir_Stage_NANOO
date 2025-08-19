import  express from 'express';
import { LikeController } from '../controllers/likeController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/create-like', authenticate, LikeController.createLike);   

export default router;