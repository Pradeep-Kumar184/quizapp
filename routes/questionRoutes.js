import express from "express";
import {
  createQuestionController,
  deleteQuestionController,
  updateQuestionController,
} from "../controller/questionController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post(
  "/createQuestion",
  requireSignIn,
  isAdmin,
  createQuestionController
);
router.put(
  "/updateQuestion/:id",
  requireSignIn,
  isAdmin,
  updateQuestionController
);
router.delete(
  "/deleteQuestion/:id",
  requireSignIn,
  isAdmin,
  deleteQuestionController
);
export default router;
