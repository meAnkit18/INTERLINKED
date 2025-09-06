// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import PostCard from '../components/PostCard';

// export default function Home() {
//   const navigate = useNavigate();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const backendURL = import.meta.env.VITE_BACKEND_PORT;
//   const categories = ['All', ...new Set(posts.map(post => post.category))];


//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch(`${backendURL}/api/posts`)
//         if (response.ok) {
//           const data = await response.json();
//           setPosts(data);
//         } else {
//           console.error('Failed to fetch posts');
//         }
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//       setLoading(false);
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <div className='container mx-auto px-4 sm:px-6 md:px-10 lg:px-20'>
//       <h1>All Posts</h1>
//       {loading ? (
//         <p>Loading posts...</p>
//       ) : (
//         <div
//         className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'
//         >
//           {posts.reverse().map((post) => (
//             <PostCard key={post._id} prop={post}/>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';

export default function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const backendURL = import.meta.env.VITE_BACKEND_PORT;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${backendURL}/api/posts`);
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

  const categories = ['All', ...new Set(posts.map(post => post.category))];

  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="container mt-22 mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
 
     <div className="flex flex-wrap gap-2 mb-4 mt-5">
    {categories.map((cat, i) => (
      <button
        key={i}
        onClick={() => setSelectedCategory(cat)}
        className={`px-4 py-2 rounded-lg border transition 
          ${selectedCategory === cat 
            ? 'bg-slate-800 text-white bg-slate-800'  
            : 'bg-white/20 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
      >
        {cat}
      </button>
    ))}
  </div>

      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPosts.reverse().map((post) => (
            <PostCard key={post._id} prop={post} />
          ))}
        </div>
      )}
    </div>
  );
}
