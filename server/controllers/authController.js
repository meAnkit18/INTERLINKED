// controllers/googleAuth.js
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    console.log("Google login body:", req.body); // 👀 Debugging

    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ message: "Missing Google credential" });
    }

    // 1️⃣ Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload;

    // 2️⃣ Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        username: name || email.split("@")[0],
        profilePicture: picture,
        googleId: sub,
      });
      await user.save();
    }

    // 3️⃣ Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    console.error("Google login error:", err.message);
    res.status(500).json({ message: "Google login failed", error: err.message });
  }
};
