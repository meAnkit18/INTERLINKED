import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext'; 

const Login = () => {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState(1)
  const [load, setLoad] = useState(false)
  const navigate = useNavigate()
  const backendURL = import.meta.env.VITE_BACKEND_PORT
  const { dispatch } = useAppContext()

  const sendOtp = async () => {
    try {
      setLoad(true)
      await axios.post(`${backendURL}/api/auth/send-otp`, { email })
      setStep(2)
    } catch (error) {
      alert("Failed to send OTP")
      console.error(error)
    } finally {
      setLoad(false)
    }
  }

  const verifyOtp = async () => {
    try {
      setLoad(true)
      const res = await axios.post(`${backendURL}/api/auth/verify-otp`, { email, otp })
      const token = res.data.token;
      localStorage.setItem("token", token);

    
      if (res.data.user) {
        dispatch({ type: "SET_USER", payload: res.data.user })
      }

      navigate('/home')
    } catch (error) {
      alert("OTP verification failed")
      console.error(error)
    } finally {
      setLoad(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {step === 1 ? (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Get Started Now</h2>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="button"
            className="w-full my-3 bg-gray-800 active:scale-95 transition py-2.5 rounded text-white"
            onClick={sendOtp}
          >
            {load ? "Sending..." : "Send OTP"}
          </button>
        </div>
      ) : (
        <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Email Verify OTP</h2>
          <p className="mt-2 text-sm text-gray-900/90 text-center">
            Enter the 6-digit code sent to your email ID.
          </p>
          <br />
          <input
            id="otp"
            className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
            type="text"
            placeholder="Enter the OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            type="button"
            className="w-full my-3 bg-gray-800 active:scale-95 transition py-2.5 rounded text-white"
            onClick={verifyOtp}
          >
            {load ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      )}
    </div>
  )
}

export default Login
