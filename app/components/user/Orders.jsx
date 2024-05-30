import Image from 'next/image'
import React from 'react'

function Orders() {
  return (
    <>
      <h1 className="text-2xl py-4 mb-6">Track Your Orders</h1>
      <div className="flex flex-wrap -m-4">
      <div className="xl:w-1/4 md:w-1/2 p-4">
        <div className="bg-gray-100 p-6 rounded-lg">
          {/* <Image className="h-40 rounded w-full object-cover object-center mb-6" src={"https://dummyimage.com/720x400"} alt="content"> */}
          <h3 className="tracking-widest text-orange-600 text-xs font-medium title-font">Products :</h3>
          
          <h2 className="text-xs text-gray-900 font-medium title-font my-4">Order Status: </h2>
          <h3 className="tracking-widest text-orange-600 text-xs font-medium title-font">Cost :</h3>
          <p className="leading-relaxed text-base"></p>
        </div>
      </div>
      </div>
    </>
  )
}

export default Orders
