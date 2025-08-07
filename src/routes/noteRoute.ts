import express from "express";
import { NoteController } from "../controllers/noteControllers";
import { authenticate } from "../middlewares/authMiddleware";


const router = express.Router();

router.post('/create-note', authenticate, NoteController.createNote);

export default router;
