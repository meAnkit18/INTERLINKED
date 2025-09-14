import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  profilePicture: { type: String },
  email: { type: String, required: true, unique: true },
  admin: { type: Boolean, default: false },
  department:{type:String,default:"None"}
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
export default User