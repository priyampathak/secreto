'use client'
// pages/index.js
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Navbar from '@/app/components/Navbar'

function Page() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <> 
    <Navbar />   
    <div className="w-screen flex h-screen justify-center items-center">
      <div>
        {!session ? (
          <button onClick={() => signIn("google")} className="font-semibold text-blue-700">Login With Google</button>
        ) : (
          <>
            <p className="text-black">Hey, {session.user?.name || 'User'} 👋 </p>
            <button onClick={() => signOut()} className="font-semibold text-blue-700">Logout</button>
            <h1 class="block sm:hidden">This is a mobile-only H1</h1>
          </>
        )}
      </div>
    </div>
    </>
  )
}

export default Page
