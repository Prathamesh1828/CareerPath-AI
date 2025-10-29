import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Verify Google ID Token and extract user information
 * @param {string} idToken - Google ID token from frontend
 * @returns {Object} User data from Google
 */
export const verifyGoogleToken = async (idToken) => {
  try {
    console.log("Verifying Google token...");
    console.log(
      "Client ID being used:",
      process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + "..."
    );

    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("Token verified successfully for:", payload.email);

    if (!payload) {
      throw new Error("Invalid token payload");
    }

    return {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      profilePicture: payload.picture,
      isEmailVerified: payload.email_verified || false,
    };
  } catch (error) {
    console.error("Google Token Verification Error Details:", {
      message: error.message,
      stack: error.stack,
    });

    if (error.message.includes("Token used too late")) {
      throw new Error("Token expired. Please try signing in again.");
    } else if (error.message.includes("Invalid token signature")) {
      throw new Error(
        "Invalid token signature. Please ensure you're using the correct Client ID."
      );
    } else if (error.message.includes("audience")) {
      throw new Error("Client ID mismatch. Please check your configuration.");
    }

    throw new Error("Invalid Google token");
  }
};
