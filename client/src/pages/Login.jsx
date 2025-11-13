import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useState, useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const backendURL = import.meta.env.VITE_BACKEND_PORT;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;

    if (
      /\bwv\b/i.test(ua) || // Android WebView
      /FBAN|FBAV|Instagram|Line|Messenger/i.test(ua) || // Social app WebViews
      window.ReactNativeWebView !== undefined // React Native WebView
    ) {
      setIsWebView(true);
    }
  }, []);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post(`${backendURL}/api/auth/google-login`, {
        token: credentialResponse.credential,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      dispatch({ type: "SET_USER", payload: user });
      navigate("/home");
    } catch (err) {
      console.error("Google login failed", err);
      alert("Google login failed");
    }
  };


  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 overflow-hidden">
      {/* 🔹 Animated background shapes */}
      <div className="absolute w-72 h-72 bg-teal-200 rounded-full opacity-30 blur-3xl animate-pulse -top-16 -left-16"></div>
      <div className="absolute w-96 h-96 bg-teal-300 rounded-full opacity-20 blur-2xl animate-ping bottom-[-120px] right-[-120px]"></div>

      {/* 🔹 Login Card */}
      <div className="relative bg-teal-50 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-teal-200 hover:shadow-teal-300 transition-all duration-300">
        {/* Logo */}
        <img
          src="https://www.pngmart.com/files/7/Community-PNG-Clipart.png"
          alt="Jan Samadhan Logo"
          className="mx-auto w-24 h-24 mb-4 rounded-full shadow-md ring-4 ring-teal-100"
        />

        {/* Title + tagline */}
        <h1 className="text-3xl font-extrabold text-teal-700 mb-2">
          Jan Samadhan
        </h1>
        <p className="text-gray-700 mb-8 text-lg italic font-medium">
          Your Voice • Your Solution
        </p>

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendURL}/api/auth/email-login`, {
        email,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      dispatch({ type: "SET_USER", payload: user });
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
   <div className="mt-22 flex items-center justify-center h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 overflow-visible">

      {/* 🔹 Static background shapes */}
      <div className="absolute w-72 h-72 bg-teal-200 rounded-full opacity-30 blur-3xl -top-16 -left-16"></div>
      <div className="absolute w-96 h-96 bg-teal-300 rounded-full opacity-20 blur-2xl bottom-[-120px] right-[-120px]"></div>


      <div className="">
        <div className="relative bg-teal-50 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-teal-200 hover:shadow-teal-300 transition-all duration-300">
          {/* Logo */}
          <img
            src="https://www.pngmart.com/files/7/Community-PNG-Clipart.png"
            alt="Jan Samadhan Logo"
            className="mx-auto w-24 h-24 mb-4 rounded-full shadow-md ring-4 ring-teal-100"
          />


        {/* Footer text */}
        <p className="mt-6 text-sm text-gray-600">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-teal-600 hover:underline">
            Terms
          </a>{" "}
          &{" "}
          <a href="/privacy" className="text-teal-600 hover:underline">
            Privacy Policy
          </a>
        </p>

          <h1 className="text-3xl font-extrabold text-teal-700 mb-2">
            Jan Samadhan
          </h1>
          <p className="text-gray-700 mb-8 text-lg italic font-medium">
            Your Voice • Your Solution
          </p>

          {/* Google Login (only if not WebView) */}
          {!isWebView && (
            <div className="flex justify-center mb-6">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => alert("Google Login Failed")}
                size="large"
                theme="outline"
                shape="pill"
              />
            </div>
          )}

          {/* Email/Password Form - ALWAYS visible */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
            >
              Continue
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-teal-600 hover:underline">
              Terms
            </a>{" "}
            &{" "}
            <a href="/privacy" className="text-teal-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
