import Navbar from '@/app/components/Navbar'
import React from 'react'

function page() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
        <div className="w-1/3  px-6 py-10 bg-white rounded-md">
          <h1 className="font-semibold text-4xl pb-4 text-center">CARMELL</h1>
          <h1 className="font-semibold text-2xl">Log In</h1>
          <input type='text' placeholder='' className="border-black border-2 rounded-md p-2 w-full my-4" />
          <button className="bg-blue-700 text-center w-full p-3 rounded-md text-white">Continue</button>
        </div> 
      </div>
    </div>
  )
}

export default page
