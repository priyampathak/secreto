'use client'
// pages/index.js
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

import Navbarnor from '@/app/components/Navbarnor'
import Navbar from '@/app/components/Navbar'

function Page() {
  const { data: session, status } = useSession()
  if (status === 'loading') {
    return null
  }
  return (
    <> 
      <div className="w-screen flex h-screen justify-center items-center bg-gray-200 shadow-gray-400 shadow-lg">
      <div className="w-screen flex justify-center">
        {/* if user not logged in */}
        {!session ? (
          <>
            <div className="h-auto lg:w-1/3 bg-white lg:py-10 py-6 lg:px-6 px-4 rounded-md">
              <h1 className="text-black text-4xl py-6 text-center">CARMELL</h1>
              <h1 className=" text-black font-extrabold py-4">One Tap Login or Sign up</h1>
              <button className=" bg-red-800 text-white w-full h-10 rounded-md my-2" onClick={()=>signIn("google")}>Continue With Google</button>
              <button className=" bg-blue-500 text-white w-full h-10 rounded-md my-2">Continue With Facebook</button>
              <div className="my-4">
                <h1 className="text-blue-700">Privacy</h1>
                <h1 className="text-blue-700">Back to home</h1>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-black">Hey, {session.user?.name || 'User'} 👋 </p>
            <button onClick={() => signOut()} className="font-semibold text-blue-700">Logout</button>
          </>
        )}
      </div>
    </div>
    </>
  )
}

export default Page
