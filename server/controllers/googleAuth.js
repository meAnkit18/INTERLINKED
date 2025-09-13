import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        username: name || email.split("@")[0],
        profilePicture: picture,
        email,
      });
      await user.save();
    }

    const authToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Google login successful",
      token: authToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Google login failed", details: err.message });
  }
};
