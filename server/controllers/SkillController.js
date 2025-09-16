import Skill from "../models/Skill.js";

// @desc    Create new user skill
// @route   POST /api/skill
export const createskill = async (req, res) => {
  try {
    // ✅ req.user comes from JWT middleware
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Create skill document for this user
    const newSkill = await Skill.create({ ...req.body, userId });

    res.status(201).json(newSkill);
  } catch (error) {
    console.error("Create skill error:", error);
    res.status(500).json({ message: "Failed to create skill", error });
  }
};

// @desc    Get all skills
// @route   GET /api/skill
export const getskills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Get single skill
// @route   GET /api/skill/:id
export const getskillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "skill not found" });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
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
    if (!updatedskill)
      return res.status(404).json({ message: "skill not found" });
    res.json(updatedskill);
  } catch (error) {
    res.status(500).json({ message: "Failed to update skill", error });
  }
};

// @desc    Delete skill
// @route   DELETE /api/skill/:id
export const deleteskill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "skill not found" });

    await skill.deleteOne();
    res.json({ message: "skill removed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete skill", error });
  }
};

// controllers/skillController.js
export const getMyskill = async (req, res) => {
  try {
    const userId = req.user.id; // comes from JWT middleware

    // Fetch only this user's skill document
    const profile = await Skill.findOne({ userId });

    if (!profile) {
      return res
        .status(404)
        .json({ message: "Profile not found for this user" });
    }

    res.json(profile);
  } catch (error) {
    console.error("getMyskill error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getSkillsByUserId = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming route: /skills/user/:userId

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const skills = await Skill.findOne({ userId });

    if (!skills) {
      return res.status(404).json({ message: "No skills found for this user" });
    }

    res.json(skills);
  } catch (error) {
    console.error("getSkillsByUserId error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
