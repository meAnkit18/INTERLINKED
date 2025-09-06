import React, { use } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { useEffect, useState } from 'react';
import axios from 'axios';


export  function NavBar() {
    const [open, setOpen] = React.useState(false)
    const {user} = useAppContext()
    const navigate = useNavigate()
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
      const res = await axios.get(`${backendURL}/api/auth/account`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUdet(res.data);
    } catch (err) {
      console.error('Error fetching user posts:', err);
    }
  };


  


    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <a href="#">
               <h1 className='text-3xl font-bold'>Jan Samadhan</h1>
            </a>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <Link to="/home">Home</Link>
                <Link to="/">Trending</Link>
                <Link to="/">about</Link>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path clip-rule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                    {udet ? (
                        <img
                            src={udet.profilePicture || "/default-avatar.png"}
                            alt="Profile"
                            className="w-10 h-10 rounded-full cursor-pointer"
                            onClick={() => navigate('/account')}
                        />
                        ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
                        >
                            Login
                        </button>
                        )}


                {/* <button
                onClick={() => navigate('/login')}
                className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                    Login
                </button> */}
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <a href="#" className="block">Home</a>
                <a href="#" className="block">About</a>
                <a href="#" className="block">Contact</a>
                {/* {
                    user && (
                        <h1>{udet.username}</h1>

                    )
                }
                <button className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                    Login
                </button> */}

               {udet ? (
                    <div className="flex items-center gap-2">
                        <img
                        src={udet.profilePicture || "/default-avatar.png"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full cursor-pointer"
                        onClick={() => navigate('/account')}
                        />
                        <span>{udet.username}</span>
                    </div>
                    ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
                    >
                        Login
                    </button>
                    )}



            </div>

        </nav>
    )
}