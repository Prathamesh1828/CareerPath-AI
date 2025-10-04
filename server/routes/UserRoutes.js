import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  getMyProfile,
  googleAuth,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);

router.get("/me", protect, getMyProfile);
router.get("/all", protect, getAllUsers);
router.get("/profile/:id", protect, getUserById);

export default router;
