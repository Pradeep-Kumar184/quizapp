import express from "express";
import {
  createQuizController,
  getAllQuizController,
  getQuizByDifficulty,
  getSingleQuizController,
  updateQuizController,
} from "../controller/quizController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/createQuiz", requireSignIn, isAdmin, createQuizController);
router.get("/getAllQuiz", getAllQuizController);
router.get("/getOne/:id", getSingleQuizController);
router.put("/updateQuiz/:id", requireSignIn, isAdmin, updateQuizController);
router.get(
  "/getQuizByDifficulty/:difficultyLevel",
  requireSignIn,
  getQuizByDifficulty
);
export default router;