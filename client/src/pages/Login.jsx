import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const backendURL = import.meta.env.VITE_BACKEND_PORT;

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
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 overflow-hidden">
      {/* 🔹 Animated background shapes */}
      <div className="absolute w-72 h-72 bg-sky-200 rounded-full opacity-30 blur-3xl animate-pulse -top-16 -left-16"></div>
      <div className="absolute w-96 h-96 bg-sky-300 rounded-full opacity-20 blur-2xl animate-ping bottom-[-120px] right-[-120px]"></div>

      {/* 🔹 Login Card */}
      <div className="relative bg-sky-50 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-sky-200 hover:shadow-sky-300 transition-all duration-300">
        {/* Logo */}
        <img
          src="https://www.pngmart.com/files/7/Community-PNG-Clipart.png"
          alt="Jan Samadhan Logo"
          className="mx-auto w-24 h-24 mb-4 rounded-full shadow-md ring-4 ring-sky-100"
        />

        {/* Title + tagline */}
        <h1 className="text-3xl font-extrabold text-sky-700 mb-2">
          Jan Samadhan
        </h1>
        <p className="text-gray-700 mb-8 text-lg italic font-medium">
          Your Voice • Your Solution
        </p>

        {/* Google Login Button */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => alert("Google Login Failed")}
            size="large"
            theme="outline"
            shape="pill"
          />
        </div>

        {/* Footer text */}
        <p className="mt-6 text-sm text-gray-600">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-sky-600 hover:underline">
            Terms
          </a>{" "}
          &{" "}
          <a href="/privacy" className="text-sky-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
