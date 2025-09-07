import React from 'react'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()
  const backendURL = import.meta.env.VITE_BACKEND_PORT  
  return (
    <div>
      <h1 className='text-3xl font-bold underline text-center text-amber-700'>Landing Page</h1>
      <button onClick={()=> navigate('/login')}>Login/Signup</button>
    </div>
  )
}

export default LandingPage
