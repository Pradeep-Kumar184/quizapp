import express from "express";
import {
  createQuizController,
  deleteQuiz,
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
router.delete("/deleteQuiz/:id", requireSignIn, isAdmin, deleteQuiz);
export default router;
