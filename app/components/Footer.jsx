import React from 'react'
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { RiFacebookCircleLine } from "react-icons/ri";

function footer() {
  return (
    <div className="w-screen bg-black p-16 h-auto">
      <div className="flex w-full">
        <div className="w-1/4">
          <h1 className="text-white text-4xl">Build by</h1>
          <h1 className="text-white text-4xl">Biology</h1>
        </div>
        <div className="w-1/4">
          <h1 className=" text-white py-1 text-sm">Carmell Secretome</h1>
          <h1 className=" text-white py-1 text-sm">Ingredient Overview</h1>
          <h1 className=" text-white py-1 text-sm">No Foul 14</h1>
          <h1 className=" text-white py-1 text-sm">Corporate Overview</h1>
          <h1 className=" text-white py-1 text-sm">Press Releases</h1>
        </div>
        <div className=" w-72">
          <h1 className=" text-white py-1 text-sm">Terms of Service</h1>
          <h1 className=" text-white py-1 text-sm">Sales Policy</h1>
          <h1 className=" text-white py-1 text-sm">Privacy Policy</h1>
          <h1 className=" text-white py-1 text-sm">Refund Policy</h1>
          <h1 className=" text-white py-1 text-sm">Contact Us</h1>
        </div>
        <div className="w-1/4 flex">
          <input type='text' placeholder='Email' className="p-2 w-80 h-10" />
          <button className="bg-white text-black text-center p-2 ml-3 h-10 w-32">Submit</button>
        </div>
      </div>
      <div className="flex mt-20">
        <div className=" w-1/2">
          <h1 className=" text-white py-1 text-sm">
            CARMELL CORP. All rights reserved © 2024
          </h1>
        </div>
        <div className="flex">
          <h1 className="text-white"><RiFacebookCircleLine className="h-7 w-7 mx-2" /> </h1>
          <h1 className="text-white"><FaInstagram className="h-7 w-7 mx-2" /> </h1>
        </div>
      </div>
    </div>
  )
}

export default footer
