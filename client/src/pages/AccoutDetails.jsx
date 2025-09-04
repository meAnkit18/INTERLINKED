import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';

function AccoutDetails() {
  const { user } = useAppContext();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const backendURL = import.meta.env.VITE_BACKEND_PORT;

  useEffect(() => {
    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  const fetchUserPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${backendURL}/api/posts/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching user posts:', err);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${backendURL}/api/posts`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUserPosts(); // Refresh posts after successful upload
      setTitle('');
      setDescription('');
      setImage(null);
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  if (!user) return <p>Loading user info...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Profile</h1>
      <p><strong>Email:</strong> {user.email}</p>

      <div style={{ marginTop: '20px' }}>
        <h2>Create a new post</h2>
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

      <div style={{ marginTop: '20px' }}>
        <h2>My Posts</h2>
        {posts.map((post) => (
          <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <img src={post.imageUrl} alt={post.title} style={{ maxWidth: '200px' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccoutDetails;
