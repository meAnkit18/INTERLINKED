import Post from '../models/Post.js';
import axios from "axios";

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file.path;
    const user = req.user.id;

    let confidence = 0;
    let category = "";

    try {
      const response = await axios.get(
        `https://ayushg2500-ai-model.hf.space/predict_get?complaint=${encodeURIComponent(
          title
        )}`
      );

      const data = response.data;
      if (data && data.predicted_label) {
        category = data.predicted_label;  
        confidence = data.confidence || 0; 
      }
    } catch (error) {
      console.error("ML model error:", error.message);
      
    }

    
    const newPost = new Post({
      title,
      description,
      imageUrl,
      user,
      confidence,
      category,
    });

    await newPost.save();
    res.status(201).json(newPost);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Post creation failed", error: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ user: userId }).populate('user', 'username');
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to get user posts', error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username');
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to get all posts', error: error.message });
  }
};
