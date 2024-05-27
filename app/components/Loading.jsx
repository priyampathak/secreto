import Image from 'next/image'
import React from 'react'
import load from '@/public/loading/load.svg'

function Loading() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div>
          <Image 
            src={load}
            height={100}
            width={100}
            alt='loader'
            priority // Add this line to give the image high loading priority
          />
        </div>
      </div>
    </>
  )
}

export default Loading
