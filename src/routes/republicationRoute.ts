import express from "express";
import { RepublicationController } from "../controllers/republicationController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.post(
  "/create-republication",
  authenticate,
  RepublicationController.createRepublication
);
router.get(
  "/get-republication/:id",
  authenticate,
  RepublicationController.getRepublicationById
);
router.get(
  "/get-republications/:user_id",
  authenticate,
  RepublicationController.getAllRepublications
);
export default router;
