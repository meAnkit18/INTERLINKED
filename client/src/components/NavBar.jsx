import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [taglineIndex, setTaglineIndex] = useState(0);
  const taglines = [
    "Your Voice, Your Solution",
    "आपकी आवाज, आपका समाधान",
  ];

  // Rotate tagline
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const isLoggedIn = !!localStorage.getItem("token");

  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-9999 flex items-center justify-between px-6 md:px-16 lg:px-24 py-4 shadow-md bg-sky-500 text-white transition-all">
      {/* Logo + Tagline */}
      <div className="flex items-center h-10 gap-2">
        <img
          src="https://www.pngmart.com/files/7/Community-PNG-Clipart.png"
          alt="Jan Samadhan Logo"
          className="h-15 w-15 object-contain rounded-full shadow-sm bg-white p-1"
        />
        <div className="flex flex-col leading-tight">
          <Link
            to="/"
            className="text-lg md:text-xl font-bold text-white hover:text-sky-200 transition"
          >
            Jan Samadhan
          </Link>
          <span className="text-xs italic">{taglines[taglineIndex]}</span>
        </div>
      </div>


      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 font-medium">
        <Link to="/" className="hover:text-sky-200 transition">
          Home
        </Link>
        <Link to="/report" className="hover:text-sky-200 transition">
          Report
        </Link>
        <Link to="/account" className="hover:text-sky-200 transition">
          Account
        </Link>

        <button
          onClick={handleAuth}
          className="px-6 py-2 bg-white text-sky-600 rounded-full font-semibold hover:bg-sky-100 transition"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-white focus:outline-none"
      >
        ☰
      </button>

      {/* Mobile Dropdown */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-sky-500 text-white flex flex-col gap-4 px-6 py-4 shadow-md md:hidden">
          <Link to="/" className="hover:text-sky-200" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/report" className="hover:text-sky-200" onClick={() => setOpen(false)}>
            Report
          </Link>
          <Link to="/account" className="hover:text-sky-200" onClick={() => setOpen(false)}>
            Account
          </Link>

          <button
            onClick={() => {
              handleAuth();
              setOpen(false);
            }}
            className="px-6 py-2 bg-white text-sky-600 rounded-full font-semibold hover:bg-sky-100 transition"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
