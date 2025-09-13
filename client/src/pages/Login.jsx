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
    <div className="flex items-center justify-center h-screen">
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => alert("Google Login Failed")}
      />
    </div>
  );
};

export default Login;
