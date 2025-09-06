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

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body

  if (OTPStorage[email] !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' })
  }
  const baseUsername = email.split('@')[0];
const randomNum = Math.floor(10 + Math.random() * 90);
const username = `${baseUsername}${randomNum}`;

  const profilePicture = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjWHVaY-wRjLvQDY-FhyphenhyphenPKYH9Gb1Kz9nUz2Bu4zeEpRXDCfjBE7jyANtu_ZOxpzZD6tMoG3H62XDO5IrYZhPqBn3E0nnuD6IRvA6AcdNHHNsN3h_A6FsU0s4D7XSi8NzxIi50CHKrk_p4xVT1K4fgyDhIp1b9RycsVAd7-KrmbzXCzdcA7D2CDf3eocDwQ/s512/profile-user.png"
  try {
    let user = await User.findOne({ email })
    if (!user) {
      user = new User({ 
        username,
        profilePicture,
        email,
       })
      await user.save()
    }

    //generate jwt token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    delete OTPStorage[email]

    res.status(200).json({
      message: 'OTP verified successfully',
      token,
      user: { 
         id: user._id,
          email: user.email,
          username: user.username,
          profilePicture: user.profilePicture
       }
    })
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message })
  }
}

export const account =async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
}