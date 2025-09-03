import React from 'react'

function LandingPage() {
  const backendURL = import.meta.env.VITE_BACKEND_PORT  
  return (
    <div>
      <h1 className='text-3xl font-bold underline text-center text-amber-700'>Landing Page</h1>
    </div>
  )
}

export default LandingPage
