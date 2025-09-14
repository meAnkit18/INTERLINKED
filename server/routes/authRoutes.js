import express from 'express'
import { sendOtp, verifyOtp,account, updateUser } from '../controllers/authController.js'
import { requireAuth } from '../middleware/authm.js'
import upload from '../middleware/multer.js'
import { googleLogin } from "../controllers/googleAuth.js";
import { loginOrRegister } from "../controllers/authController.js";



const router = express.Router()

router.post('/send-otp', sendOtp)
router.post('/verify-otp', verifyOtp)
router.get('/account', requireAuth ,account)
router.put('/user/update', requireAuth, upload.single('profilePicture'), updateUser)
router.post("/google-login", googleLogin);
router.post("/email-login", loginOrRegister);

export default router