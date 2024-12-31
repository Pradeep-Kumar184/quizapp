import express from "express";

import {
  getQuizResultController,
  submitUserAnswerController,
} from "../controller/userAnswerController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/submitAnswer", requireSignIn, submitUserAnswerController);
router.get("/getResult/:id", requireSignIn, getQuizResultController);
export default router;
