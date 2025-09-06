import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  confidence:{
    type: Number,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  latitude:{
    type: Number,
    required: true,
  },
  longitude:{
    type: Number,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Post', postSchema);