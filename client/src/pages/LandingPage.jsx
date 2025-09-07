import React from 'react'
import { useNavigate } from 'react-router-dom'
import MapView from '../components/MapView'
import { useEffect, useState } from 'react'

function LandingPage() {
  const navigate = useNavigate()
  const backendURL = import.meta.env.VITE_BACKEND_PORT  
  const [posts, setPosts] = useState([]);

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
     };
 
     fetchPosts();
   }, []);

  return (
    <div>
      <h1 className='text-3xl font-bold underline text-center text-amber-700'>Landing Page</h1>
      <button onClick={()=> navigate('/login')}>Login/Signup</button>
      <MapView posts={posts}/>
    </div>
  )
}

export default LandingPage
