import jwt from 'jsonwebtoken' 
import nodemailer from 'nodemailer'
import User from '../models/User.js'

const OTPStorage = {}

export const sendOtp = async (req, res) => {
  const { email } = req.body
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  OTPStorage[email] = otp

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}`
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ message: 'OTP sent' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP', details: err })
  }
}

// Verify OTP
const verifyOtp = async () => {
  if (!otp) return alert("Enter OTP!");
  try {
    setLoad(true);

    const res = await axios.post(`${backendURL}/api/auth/verify-otp`, {
      email,
      otp,
    });

    console.log("Verify Response:", res.data); // debug

    const { token, user } = res.data;
    if (!token) {
      alert("No token returned from server. Check backend response.");
      return;
    }

    // save token & user
    localStorage.setItem("token", token);
    if (user) {
      dispatch({ type: "SET_USER", payload: user });
    }

    setIsAuthenticated(true);
    navigate("/home");
  } catch (error) {
    console.error("OTP verification failed:", error.response?.data || error);
    alert(error.response?.data?.error || "OTP verification failed. Please try again.");
  } finally {
    setLoad(false);
  }
};

export const account =async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { username } = req.body;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) {
      user.username = username;
    }

    if (req.file) {
      user.profilePicture = req.file.path;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
};