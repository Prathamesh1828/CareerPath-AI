import express from "express";
import {
  createskill,
  getskills,
  getskillById,
  updateskill,
  deleteskill,
  getMyskill,
  getSkillsByUserId,
} from "../controllers/SkillController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// Protected routes
router.post("/", protect, createskill); // create skill
router.get("/me", protect, getMyskill); // fetch logged-in user's skill(s)
router.get("/user/:userId", protect, getSkillsByUserId); // optional, admin

// Public routes
router.get("/", getskills); // get all skills
router.get("/:id", getskillById);
router.put("/:id", protect, updateskill);
router.delete("/:id", protect, deleteskill);

// routes/skillRoutes.js

export default router;
