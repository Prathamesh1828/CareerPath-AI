import Skill from "../models/Skill.js";
import mongoose from "mongoose";

// @desc    Create new user skill
export const createskill = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Clean incoming data
    const {
      currentRole,
      experience,
      skills = [],
      careerGoals = "",
      preferredPlatforms = "",
      budget,
      timeCommitment,
      learningStyle = "",
    } = req.body;

    // Convert comma-separated strings to arrays
    const cleanedCareerGoals = Array.isArray(careerGoals)
      ? careerGoals
      : careerGoals
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean);

    const cleanedPlatforms = Array.isArray(preferredPlatforms)
      ? preferredPlatforms
      : preferredPlatforms
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean);

    const cleanedLearningStyles = Array.isArray(learningStyle)
      ? learningStyle
      : learningStyle
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

    // Check if user already has a skill profile
    let existingSkill = await Skill.findOne({ userId });

    let skillProfile;
    if (existingSkill) {
      // Update existing
      skillProfile = await Skill.findOneAndUpdate(
        { userId },
        {
          currentRole,
          experience,
          skills,
          careerGoals: cleanedCareerGoals,
          preferredPlatforms: cleanedPlatforms,
          budget,
          timeCommitment,
          learningStyle: cleanedLearningStyles,
        },
        { new: true }
      );
    } else {
      // Create new
      skillProfile = await Skill.create({
        userId,
        currentRole,
        experience,
        skills,
        careerGoals: cleanedCareerGoals,
        preferredPlatforms: cleanedPlatforms,
        budget,
        timeCommitment,
        learningStyle: cleanedLearningStyles,
      });
    }

    res.status(201).json({
      success: true,
      data: skillProfile,
      message: existingSkill
        ? "Skill profile updated"
        : "Skill profile created",
    });
  } catch (error) {
    console.error("Create skill error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create skill",
      error: error.message,
    });
  }
};

// @desc    Get all skills
// @route   GET /api/skill
export const getskills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get single skill
// @route   GET /api/skill/:id
export const getskillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "skill not found",
      });
    }
    res.json({
      success: true,
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Update skill
// @route   PUT /api/skill/:id
export const updateskill = async (req, res) => {
  try {
    const updatedskill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedskill) {
      return res.status(404).json({
        success: false,
        message: "skill not found",
      });
    }
    res.json({
      success: true,
      data: updatedskill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update skill",
      error: error.message,
    });
  }
};

// @desc    Delete skill
// @route   DELETE /api/skill/:id
export const deleteskill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "skill not found",
      });
    }

    await skill.deleteOne();
    res.json({
      success: true,
      message: "skill removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete skill",
      error: error.message,
    });
  }
};

// @desc    Get logged-in user's skill profile
// @route   GET /api/skill/me
export const getMyskill = async (req, res) => {
  try {
    const userId = req.user?.id;

    console.log("🔍 Fetching skills for userId:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const skillProfile = await Skill.findOne({ userId });

    console.log("📊 Found skill profile:", skillProfile);

    // Return consistent format
    if (!skillProfile) {
      return res.status(200).json({
        success: true,
        data: null,
        message: "No skill profile found",
      });
    }

    // FIXED: Return data in consistent format
    res.status(200).json({
      success: true,
      data: skillProfile, // Make sure it's nested in 'data'
    });
  } catch (error) {
    console.error("❌ Fetch skill error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch skill profile",
      error: error.message,
    });
  }
};

// @desc    Get skills by userId (admin)
// @route   GET /api/skill/user/:userId
export const getSkillsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const skills = await Skill.findOne({ userId });

    if (!skills) {
      return res.status(404).json({
        success: false,
        message: "No skills found for this user",
      });
    }

    res.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    console.error("getSkillsByUserId error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
