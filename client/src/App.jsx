import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Not404Pg from "./pages/Not404Pg";
import AccoutDetails from "./pages/AccoutDetails";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";

// Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CreatePost from "./components/CreatePost";

// 🔒 Protected Route Wrapper
function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  // ⚡ Authentication state (later replace with Context or real auth)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {/* Navbar always visible */}
      <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AccoutDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createpost"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PostDetails />
            </ProtectedRoute>
          }
        />

        {/* 404 Fallback */}
        <Route path="*" element={<Not404Pg />} />
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </>
  );
}

export default App;
