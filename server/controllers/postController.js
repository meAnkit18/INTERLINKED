import Post from "../models/Post.js";
import axios from "axios";

// Create Post
export const createPost = async (req, res) => {
  try {
    const { title, description, longitude, latitude } = req.body;
    const imageUrl = req.file?.path;
    const user = req.user.id;

    let confidence = 0;
    let category = "";

    try {
      const response = await axios.get(
        `https://ayushg2500-ai-model.hf.space/predict_get?complaint=${encodeURIComponent(
          title
        )}&api=${process.env.MODEL_URL}`
      );
      const data = response.data;
      if (data && data.predicted_label) {
        category = data.predicted_label;
        confidence = data.confidence || 0;
      }
    } catch (err) {
      console.error("ML API error:", err.message);
      category = "General";
      confidence = 0;
    }

    const safeLatitude =
      latitude && latitude !== "null" ? Number(latitude) : undefined;
    const safeLongitude =
      longitude && longitude !== "null" ? Number(longitude) : undefined;

    const newPost = new Post({
      title,
      description,
      imageUrl,
      user,
      confidence,
      category,
      latitude: safeLatitude,
      longitude: safeLongitude,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).json({ message: "Post creation failed", error: err.message });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username profilePicture");
    res.status(200).json(posts);
  } catch (err) {
    console.error("Get all posts error:", err);
    res.status(500).json({ message: "Failed to get all posts", error: err.message });
  }
};

// Get user posts
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ user: userId }).populate("user", "username profilePicture");
    res.status(200).json(posts);
  } catch (err) {
    console.error("Get user posts error:", err);
    res.status(500).json({ message: "Failed to get user posts", error: err.message });
  }
};

// Get post by ID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("user", "username profilePicture");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (err) {
    console.error("Get post by ID error:", err);
    res.status(500).json({ message: "Failed to get post", error: err.message });
  }
};
