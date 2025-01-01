import express from "express";
import {
  forgotPasswordController,
  getAllUsers,
  loginController,
  registerController,
  updateProfileController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.put("/updateUser/:id", requireSignIn, updateProfileController);
router.get("/getUser", requireSignIn, isAdmin, getAllUsers);
export default router;
