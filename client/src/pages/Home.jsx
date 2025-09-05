import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendURL = import.meta.env.VITE_BACKEND_PORT;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${backendURL}/api/posts`)
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1 className='text-center mt-5 text-amber-800 text-3xl font-bold'>Home</h1>
      <button onClick={() => navigate('/account')}>Account</button>
      <h1>All Posts</h1>
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div>
          {posts.reverse().map((post) => (
            <div key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <img src={post.imageUrl} alt={post.title} />
              {/* <p>Posted by: {post.user.username}</p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

