// import Post from '../models/Post.js';
// import axios from "axios";

// export const createPost = async (req, res) => {
//   try {
//     const { title, description,longitude,latitude } = req.body;
//     const imageUrl = req.file.path;
//     const user = req.user.id;

//     let confidence = 0;
//     let category = "";

//     try {
//       const response = await axios.get(
//         `https://ayushg2500-ai-model.hf.space/predict_get?complaint=${title}&api=${process.env.MODEL_URL}`
//       );

//       const data = response.data;
//       if (data && data.predicted_label) {
//         category = data.predicted_label;  
//         confidence = data.confidence || 0; 
//       }
//     } catch (error) {
//       console.error("ML model error:", error.message);
      
//     }

    
//     const newPost = new Post({
//       title,
//       description,
//       imageUrl,
//       user,
//       confidence,
//       category,
//       latitude,
//       longitude,

//     });

//     await newPost.save();
//     res.status(201).json(newPost);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Post creation failed", error: error.message });
//   }
// };

// export const getUserPosts = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const posts = await Post.find({ user: userId }).populate('user', 'username profilePicture');
//     res.status(200).json(posts);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Failed to get user posts', error: error.message });
//   }
// };

// export const getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.find().populate('user', 'username profilePicture');
//     res.status(200).json(posts);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Failed to get all posts', error: error.message });
//   }
// };

// export const getPostById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const post = await Post.findById(id).populate('user', 'username profilePicture');
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
//     res.status(200).json(post);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Failed to get post', error: error.message });
//   }
// };


import Post from '../models/Post.js';
import axios from "axios";

export const createPost = async (req, res) => {
  try {
    const { title, description, longitude, latitude } = req.body;
    const imageUrl = req.file?.path; // use optional chaining to avoid crash if no file
    const user = req.user.id;

    let confidence = 0;
    let category = "";

    // Call ML API
    try {
      const response = await axios.get(
        `https://ayushg2500-ai-model.hf.space/predict_get?complaint=${title}&api=${process.env.MODEL_URL}`
      );

      const data = response.data;
      if (data && data.predicted_label) {
        category = data.predicted_label;
        confidence = data.confidence || 0;
      }
    } catch (error) {
      console.error("ML model error:", error.message);
    }

    // 🛠️ sanitize lat/long so "null" string doesn’t break
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

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Post creation failed", error: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ user: userId }).populate(
      "user",
      "username profilePicture"
    );
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to get user posts", error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username profilePicture");
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to get all posts", error: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate(
      "user",
      "username profilePicture"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to get post", error: error.message });
  }
};


export const upvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Remove user from downvotes
    post.downvotes = post.downvotes.filter(
      userId => userId.toString() !== req.user.id
    );

    // Toggle upvote
    if (post.upvotes.includes(req.user.id)) {
      post.upvotes = post.upvotes.filter(userId => userId.toString() !== req.user.id);
    } else {
      post.upvotes.push(req.user.id);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Downvote
export const downvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Remove user from upvotes
    post.upvotes = post.upvotes.filter(
      userId => userId.toString() !== req.user.id
    );

    // Toggle downvote
    if (post.downvotes.includes(req.user.id)) {
      post.downvotes = post.downvotes.filter(userId => userId.toString() !== req.user.id);
    } else {
      post.downvotes.push(req.user.id);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};