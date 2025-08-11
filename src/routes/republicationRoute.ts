import express from 'express';
import { RepublicationController } from '../controllers/republicationController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/create-republication', authenticate, RepublicationController.createRepublication);

export default router;