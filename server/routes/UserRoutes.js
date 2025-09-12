import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  getMyProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js"; // Import Middleware

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", getAllUsers);
router.get("/profile/:id", getUserById);
router.get("/me", protect, getMyProfile); // <-- New Route to fetch logged-in user profile

export default router;
