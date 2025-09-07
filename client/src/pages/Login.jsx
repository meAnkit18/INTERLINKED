import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_PORT;
  const { dispatch } = useAppContext();

  const sendOtp = async () => {
    try {
      setLoad(true);
      await axios.post(`${backendURL}/api/auth/send-otp`, { email });
      setStep(2);
    } catch (error) {
      alert("Failed to send OTP");
      console.error(error);
    } finally {
      setLoad(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoad(true);
      const res = await axios.post(`${backendURL}/api/auth/verify-otp`, { email, otp });
      const token = res.data.token;
      localStorage.setItem("token", token);

      if (res.data.user) {
        dispatch({ type: "SET_USER", payload: res.data.user });
      }

      navigate('/home');
    } catch (error) {
      alert("OTP verification failed");
      console.error(error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-sky-300 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-2xl rounded-3xl overflow-hidden bg-white/90 backdrop-blur-md">
        
        {/* Left Side: Logo + Name + Tagline */}
        <motion.div 
          className="md:w-1/2 bg-sky-200 flex flex-col justify-center items-center p-10 relative"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img 
            src="https://www.pngmart.com/files/7/Community-PNG-Clipart.png" 
            alt="Jan Samadhan Logo" 
            className="h-28 w-28 mb-4 object-contain rounded-full shadow-md bg-white p-2"
          />
          <h1 className="text-4xl font-bold text-sky-900 mb-2 text-center">Jan Samadhan</h1>
          <p className="text-lg text-sky-800 italic text-center">
            Your Voice, Your Right, Your Solution
          </p>
          {/* Optional decorative blobs */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-sky-300 rounded-full opacity-30 animate-pulse -translate-x-10 -translate-y-10"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-sky-400 rounded-full opacity-20 animate-pulse translate-x-16 translate-y-16"></div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {step === 1 ? (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-center text-sky-700 mb-4">Get Started</h2>
              <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-400 focus:outline-none text-gray-800"
              />
              <button
                onClick={sendOtp}
                className="w-full py-3 mt-2 rounded-full bg-sky-600 text-white font-semibold shadow-md hover:bg-sky-700 hover:shadow-lg transition transform hover:-translate-y-0.5 active:scale-95"
              >
                {load ? "Sending..." : "Send OTP"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-sky-700 text-center mb-2">Verify OTP</h2>
              <p className="text-gray-600 text-sm text-center mb-4">
                Enter the 6-digit code sent to your email.
              </p>
              <input
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-400 focus:outline-none text-gray-800"
              />
              <button
                onClick={verifyOtp}
                className="w-full py-3 rounded-full bg-sky-600 text-white font-semibold shadow-md hover:bg-sky-700 hover:shadow-lg transition transform hover:-translate-y-0.5 active:scale-95"
              >
                {load ? "Verifying..." : "Verify OTP"}
              </button>
              <button
                onClick={() => setStep(1)}
                className="w-full py-2 rounded-full bg-white text-sky-600 font-semibold border border-sky-400 hover:bg-sky-100 transition"
              >
                Change Email
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
