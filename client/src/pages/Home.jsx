import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';

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
    <div className='container mx-auto px-4 sm:px-6 md:px-10 lg:px-20'>
      <h1>All Posts</h1>
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div
        className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'
        >
          {posts.reverse().map((post) => (
            <PostCard key={post._id} prop={post}/>
          ))}
        </div>
      )}
    </div>
  );
}

