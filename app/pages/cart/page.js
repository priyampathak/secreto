'use client'
import Image from 'next/image'
import React from 'react'
import img from '@/public/products/Face & Neck/Products/ReGenerative Elixir Square/Regenerative Elixir Square Render 2.jpg'
import Cart_item from '@/app/components/Cart_item'

function page() {
  return (
    <>
      <div className="h-screen w-screen bg-gray-200 px-20 py-16 overflow-hidden">
        <div className="flex my-6 w-full">
          <h1 className="font-semibold text-2xl w-1/2">Your cart</h1>
          <h1 className=" w-1/2 text-end text-blue-700 pt-2 pr-3">Back to shopping</h1>
        </div>
        <div className="w-full flex">
          <div className=" w-3/4 bg-white rounded-md p-8 shadow-lg shadow-gray-400">

            <div className="flex w-full font-extrabold">
              <div className="w-2/5 font-sans text-black" style={{fontWeight:600}}>Product</div>
              <div className=" w-1/5 text-center font-sans text-black" style={{fontWeight:600}}>Price</div>
              <div className="w-1/5 text-center font-sans text-black" style={{fontWeight:600}}>Quantity</div>
              <div className="w-1/5 text-center font-sans text-black" style={{fontWeight:600}}>Total Price</div>
            </div>

            <Cart_item img={img} product_name={"Regenerative Elixir"} price={99} quantity={2} />
            <Cart_item img={img} product_name={"Regenerative Elixir"} price={99} quantity={2} />
          </div>
          <div className="w-1/4 p-8 mx-3 font-bold font-sans bg-white rounded-md">
            <div>Billing Amount</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
