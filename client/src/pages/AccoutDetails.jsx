import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import PostCard from '../components/PostCard';

function AccoutDetails() {
  const { user } = useAppContext();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const backendURL = import.meta.env.VITE_BACKEND_PORT;
  const [udet, setUdet] = useState(null);

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
       const rese = await axios.get(`${backendURL}/api/auth/account`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUdet(rese.data);
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching user posts:', err);
    }
  };

  const handlePostSubmit = async (e) => {
  e.preventDefault();

  let latitude = null;
  let longitude = null;

  const getLocation = () =>
    new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
          () => resolve({ lat: null, lon: null }) // fallback if denied
        );
      } else {
        resolve({ lat: null, lon: null });
      }
    });

  const { lat, lon } = await getLocation();
  latitude = lat;
  longitude = lon;

  // Prepare FormData
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

    fetchUserPosts();
    setTitle("");
    setDescription("");
    setImage(null);
  } catch (err) {
    console.error("Error creating post:", err);
  }
};




  if (!user) return <p>Loading user info...</p>;

  return (
    <div className='container mt-22 mx-auto px-4 sm:px-6 md:px-10 lg:px-20'>
      <h1 className='text-2xl font-semibold mb-4 text-center'>Profile</h1>
      <div className='flex items-center gap-4 mb-4 '>
        {udet && <img src={udet.profilePicture} alt="Profile" className="h-30" />}
          <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          </div>
      </div>
      
        <h2 className='text-2xl font-semibold mb-4 text-center'>My Reported Issues</h2>
    <div
        className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'
        >
        {posts.reverse().map((post) => (
      <PostCard key={post._id} prop={post}/>
        ))}
      </div>
    </div>
  );
}

export default AccoutDetails;
