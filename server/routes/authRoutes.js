import express from 'express'
import { sendOtp, verifyOtp,account } from '../controllers/authController.js'
import  authm  from '../middleware/authm.js'

const router = express.Router()

router.post('/send-otp', sendOtp)
router.post('/verify-otp', verifyOtp)
router.get('/account', authm ,account)

export default router