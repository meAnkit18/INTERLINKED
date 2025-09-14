import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const taglines = [
    "Your Voice, Your Solution",
    "आपकी आवाज, आपका समाधान",
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const backendURL = import.meta.env.VITE_BACKEND_PORT;

  
  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`${backendURL}/api/auth/account`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [isLoggedIn, backendURL, token]);

  return (
    <nav className="fixed top-0 left-0 w-full z-9999 flex items-center justify-between px-6 md:px-16 lg:px-24 py-4 shadow-md bg-teal-800 text-white transition-all">
    
      <div className="flex items-center h-10 gap-2">
        <img
          src="https://www.pngmart.com/files/7/Community-PNG-Clipart.png"
          alt="Jan Samadhan Logo"
          className="h-14 w-14 object-contain rounded-full shadow-sm bg-white p-1"
        />
        <div className="flex flex-col leading-tight">
          <Link
            to="/"
            className="text-lg md:text-xl font-bold text-white hover:text-teal-300 transition"
          >
            Jan Samadhan
          </Link>
          <span className="text-xs italic">{taglines[taglineIndex]}</span>
        </div>
      </div>

     
      <div className="hidden md:flex items-center gap-8 font-medium">
        <Link to="/home" className="hover:text-teal-300 transition">
          Home
        </Link>
        <Link to="/trending" className="hover:text-teal-300 transition">
          Trending
        </Link>
        <Link to="/leaderboard" className="hover:text-teal-300 transition">
          Leaderboard
        </Link>
        <button type="button" className="bg-white text-teal-800 hover:bg-teal-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-teal-900 dark:focus:ring-teal-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => navigate("/createpost")}>Report Issue</button>
        {isLoggedIn ? (
          <img
            src={user?.profilePicture || "/default-avatar.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
            onClick={() => navigate("/account")}
          />
        ) : (
          <button
            onClick={() => navigate("/login")}
            className=" bg-teal-500 text-white rounded-xl font-semibold hover:bg-white hover:text-teal-800 transition
             focus:ring-4 focus:outline-none focus:ring-teal-900 dark:focus:ring-teal-400  text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Login
          </button>
        )}
      </div>

     
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-white focus:outline-none"
      >
        ☰
      </button>

     
      {open && (
        <div className="absolute top-full left-0 w-full bg-teal-700 text-white flex flex-col gap-4 px-6 py-4 shadow-md md:hidden">
          <Link to="/home" className="hover:text-teal-300" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/trending" className="hover:text-teal-300" onClick={() => setOpen(false)}>
            Trending
          </Link>
          <Link to="/leaderboard" className="hover:text-teal-300" onClick={() => setOpen(false)}>
            Leaderboard
          </Link>
          <button type="button" className="bg-white text-teal-800 hover:bg-teal-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-teal-900 dark:focus:ring-teal-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => navigate("/createpost")}>Report Issue</button>
          {isLoggedIn ? (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                navigate("/account");
                setOpen(false);
              }}
            >
              
              <span>{user?.username || "Account"}</span>
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setOpen(false);
              }}
              className=" bg-teal-500 text-white hover:text-teal-800 hover:bg-white focus:ring-4 focus:outline-none focus:ring-teal-900 dark:focus:ring-teal-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
