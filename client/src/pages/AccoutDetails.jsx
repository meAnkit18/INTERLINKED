import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import PostCard from '../components/PostCard';

function AccoutDetails() {
  const { user, dispatch } = useAppContext();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const backendURL = import.meta.env.VITE_BACKEND_PORT;
  const [udet, setUdet] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState(user ? user.username : '');
  const [newProfilePicture, setNewProfilePicture] = useState(null);

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

    fetchUserPosts();
    setTitle("");
    setDescription("");
    setImage(null);
  } catch (err) {
    console.error("Error creating post:", err);
  }
};

const handleProfileUpdate = async () => {
    const formData = new FormData();
    formData.append('username', newUsername);
    if (newProfilePicture) {
      formData.append('profilePicture', newProfilePicture);
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${backendURL}/api/auth/user/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: 'UPDATE_USER', payload: res.data.user });
      setUdet(res.data.user);
      setIsEditMode(false);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };




  if (!user) return <p>Loading user info...</p>;

  return (
    <div className='container mt-25 mx-auto px-4 sm:px-6 md:px-10 lg:px-20'>
      <h1 className='text-2xl font-semibold mb-4 text-center'>Profile</h1>
      <div className='flex items-center gap-4 mb-4 '>
        {udet && <img src={udet.profilePicture} alt="Profile" className="h-30 w-30 rounded-full object-cover" />}
        {isEditMode ? (
          <div>
            <input
              type="text"
              placeholder='New Username'
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
             <label
                htmlFor="file-upload"
                className="cursor-pointer flex justify-center items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-md hover:brightness-110 transition duration-150"
              >
                {/* 👉 Custom SVG or Icon */}
                <img
                  src="https://blogger.googleusercontent.com/img/a/AVvXsEi9UwU3oG7bGPK-_qdLHroYP9B2eKA6Ql5GVt1r4OZbZCbszaoJTDgdo4rvR19drU7H1uwIWf3uc1CgFmPZNoj2W3Bwkcbf_ErcNKbnm-aX6s1WzS4PUeZO5eW2FnfcScBm6BXiyd5Z0sa4d2HSIbIlAFs1AGi9SQJRTYTsefAStZyTR6RgTRl65ciOI3Q"
                  className="w-6 h-6"
                  alt="upload-icon"
                />
                Upload Image
              </label>

              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setNewProfilePicture(e.target.files[0])}
                className="hidden"
              />

            <button onClick={handleProfileUpdate} className="bg-slate-800 text-white px-4 py-2 rounded mt-2 mr-2">
              Save
            </button>
            <button onClick={() => setIsEditMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={() => setIsEditMode(true)} className="bg-slate-700 text-white px-4 py-2 rounded mt-2">
              Edit Profile
            </button>
          </div>
        )}
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
