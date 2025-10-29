import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyGoogleToken } from "../config/googleAuth.js";

const generateToken = (userId, email) => {
  return jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      authProvider: "local",
      isEmailVerified: false,
    });

    await newUser.save();

    const token = generateToken(newUser._id, newUser.email);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
        authProvider: newUser.authProvider,
        isEmailVerified: newUser.isEmailVerified,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.password && user.authProvider === "google") {
      return res.status(401).json({
        success: false,
        message:
          "Please sign in using Google. This account was created with Google authentication.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id, user.email);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        authProvider: user.authProvider,
        isEmailVerified: user.isEmailVerified,
        selectedCareerPath: user.selectedCareerPath,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    console.log("=== Google Auth Request ===");
    console.log("Token received:", idToken ? "Yes" : "No");
    console.log("Token length:", idToken?.length);

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "Google ID token is required",
      });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      console.error("GOOGLE_CLIENT_ID not configured in environment variables");
      return res.status(500).json({
        success: false,
        message: "Google authentication not configured on server",
      });
    }

    let googleUserData;
    try {
      googleUserData = await verifyGoogleToken(idToken);
      console.log("Token verified successfully:", googleUserData.email);
    } catch (verifyError) {
      console.error("Token verification failed:", verifyError.message);
      return res.status(401).json({
        success: false,
        message: verifyError.message || "Invalid Google token",
        error: "Token verification failed",
      });
    }

    if (!googleUserData.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message:
          "Google email is not verified. Please verify your email with Google.",
      });
    }

    let user = await User.findOne({ email: googleUserData.email });

    if (user) {
      console.log("Existing user found:", user.email);
      user.googleId = googleUserData.googleId;
      user.authProvider = "google";
      user.profilePicture = googleUserData.profilePicture;
      user.isEmailVerified = googleUserData.isEmailVerified;
      user.name = googleUserData.name;
      await user.save();
    } else {
      console.log("Creating new user:", googleUserData.email);
      user = new User({
        name: googleUserData.name,
        email: googleUserData.email,
        googleId: googleUserData.googleId,
        profilePicture: googleUserData.profilePicture,
        authProvider: "google",
        isEmailVerified: googleUserData.isEmailVerified,
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("Authentication successful for:", user.email);

    return res.status(200).json({
      success: true,
      message: "Google authentication successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        authProvider: user.authProvider,
        isEmailVerified: user.isEmailVerified,
        selectedCareerPath: user.selectedCareerPath,
      },
    });
  } catch (error) {
    console.error("=== Google Auth Error ===");
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);

    return res.status(500).json({
      success: false,
      message: "Google authentication failed",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get User By ID Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getMyProfile = async (req, res) => {
  if (!req.user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profilePicture: req.user.profilePicture,
      authProvider: req.user.authProvider,
      isEmailVerified: req.user.isEmailVerified,
      selectedCareerPath: req.user.selectedCareerPath,
      enrolledCourses: req.user.enrolledCourses,
      createdAt: req.user.createdAt,
    },
  });
};
