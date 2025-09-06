import React, { useState } from 'react';
import axios from 'axios';

function CreatePost({ fetchUserPosts }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const backendURL = import.meta.env.VITE_BACKEND_PORT;

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    let latitude = null;
    let longitude = null;

    const getLocation = () =>
      new Promise((resolve) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            () => resolve({ lat: null, lon: null }) 
          );
        } else {
          resolve({ lat: null, lon: null });
        }
      });

    const { lat, lon } = await getLocation();
    latitude = lat;
    longitude = lon;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${backendURL}/api/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (fetchUserPosts) fetchUserPosts(); 
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="container mt-22 mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
      <h2>Report Issues That you are Facing</h2>
      <form onSubmit={handlePostSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
