import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [taglineIndex, setTaglineIndex] = useState(0);
  const taglines = ["Your Voice, Your Solution", "आपकी आवाज, आपका समाधान"];

  // 🔑 Login state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  // Rotate tagline
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // 👈 redirect to LandingPage
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 py-4 shadow-md bg-sky-500 text-white transition-all">
      {/* Logo + Tagline */}
      <div className="flex items-center gap-3">
        <img
          src="https://www.pngmart.com/files/7/Community-PNG-Clipart.png"
          alt="Jan Samadhan Logo"
          className="h-14 w-14 object-contain rounded-full shadow-sm bg-white p-1"
        />
        <div className="flex flex-col">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-bold text-white hover:text-sky-200 transition"
          >
            Jan Samadhan
          </Link>
          <span className="text-sm italic">{taglines[taglineIndex]}</span>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 font-medium">
        {isLoggedIn ? (
          <>
            <Link to="/home" className="hover:text-sky-200 transition">
              Home
            </Link>
            <Link to="/report" className="hover:text-sky-200 transition">
              Report
            </Link>
            <Link to="/account" className="hover:text-sky-200 transition">
              Account
            </Link>

            {/* Profile + Logout */}
            <div className="flex items-center gap-4">
              <span className="font-semibold">👤 Profile</span>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-white text-sky-600 rounded-full font-semibold hover:bg-sky-100 transition"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Redirects to login if not logged in */}
            <button
              onClick={() => navigate("/login")}
              className="hover:text-sky-200 transition"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/login")}
              className="hover:text-sky-200 transition"
            >
              Report
            </button>
            <button
              onClick={() => navigate("/login")}
              className="hover:text-sky-200 transition"
            >
              Account
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 bg-white text-sky-600 rounded-full font-semibold hover:bg-sky-100 transition"
            >
              Login
            </button>
          </>
        )}
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
          {isLoggedIn ? (
            <>
              <Link
                to="/home"
                className="hover:text-sky-200"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/report"
                className="hover:text-sky-200"
                onClick={() => setOpen(false)}
              >
                Report
              </Link>
              <Link
                to="/account"
                className="hover:text-sky-200"
                onClick={() => setOpen(false)}
              >
                Account
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="px-6 py-2 bg-white text-sky-600 rounded-full font-semibold hover:bg-sky-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
                className="hover:text-sky-200"
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
                className="hover:text-sky-200"
              >
                Report
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
                className="hover:text-sky-200"
              >
                Account
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
                className="px-6 py-2 bg-white text-sky-600 rounded-full font-semibold hover:bg-sky-100 transition"
              >
                Login
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
