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
import Skill from "../models/Skill.js"; // Import the model

const router = express.Router();

// ⚠️ IMPORTANT: DELETE / must come BEFORE other routes
// Delete ALL user preferences
router.delete("/", protect, async (req, res) => {
  try {
    const userId = req.user?.id;

    console.log("🗑️ Attempting to delete preferences for userId:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Delete all skills for this user
    const result = await Skill.deleteMany({ userId });

    console.log(`✅ Deleted ${result.deletedCount} skill profile(s)`);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No preferences found to delete",
      });
    }

    res.json({
      success: true,
      message: "Preferences deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("❌ Error deleting preferences:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete preferences",
      error: error.message,
    });
  }
});

// Protected routes
router.post("/", protect, createskill); // create/update skill
router.get("/me", protect, getMyskill); // fetch logged-in user's skill(s)
router.get("/user/:userId", protect, getSkillsByUserId); // admin route

// Public routes
router.get("/", getskills); // get all skills

// ID-based routes (must come after specific routes)
router.get("/:id", getskillById);
router.put("/:id", protect, updateskill);
router.delete("/:id", protect, deleteskill); // Delete single skill by ID

export default router;
