import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const backendURL = import.meta.env.VITE_BACKEND_PORT;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Vote handling
  const handleVote = async (type) => {
    try {
      const res = await axios.post(
        `${backendURL}/api/posts/${id}/${type}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPost(res.data); // update post with latest vote counts
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-22">
      <div className="flex flex-col md:flex-row max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        {/* Image */}
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full md:w-96 h-64 md:h-96 object-cover"
        />

        {/* Content */}
        <div className="p-6 flex-1">
          {/* User Info */}
          <div className="flex items-center mb-5">
            <img
              src={post.user.profilePicture}
              alt={post.user.username}
              className="w-10 h-10 rounded-full mr-4 object-cover"
            />
            <div>
              <p className="font-semibold">{post.user.username}</p>
              <p className="text-gray-500 text-sm">
                Posted on {formattedDate}
              </p>
            </div>
          </div>

          {/* Post Title & Category */}
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{post.title}</h1>
          <div className="flex flex-wrap items-center mb-4">
            <span className="bg-gray-200 text-gray-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
              {post.category}
            </span>
          </div>

          {/* Location */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm md:text-base">
            <p className="text-gray-600">Latitude: {post.latitude}</p>
            <p className="text-gray-600">Longitude: {post.longitude}</p>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4">{post.description}</p>

          {/* Voting Buttons */}
          <div className="flex gap-4 mt-3">
            <button
              onClick={() => handleVote("upvote")}
              className="text-green-600 font-semibold"
            >
              👍 {post.upvotes?.length || 0}
            </button>
            <button
              onClick={() => handleVote("downvote")}
              className="text-red-600 font-semibold"
            >
              👎 {post.downvotes?.length || 0}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
