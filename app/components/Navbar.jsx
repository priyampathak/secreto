import React from 'react';
import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";

function Navbar() {
  return (
    <>
      <div className="fixed top-0 pt-6 left-0 w-full flex px-20 border-b-2 pb-8 border-white bg-black text-white z-50">
        <div className="w-1/3">
          <h2 className="text-2xl font-semibold">CARMELL</h2>
        </div>
        <div className="w-1/3 flex justify-center">
          <h2 className="text-xl pr-5">Science</h2>
          <h2 className="text-xl pr-5">Shop</h2>
          <h2 className="text-xl pr-5">Corporate</h2>
        </div>
        <div className="w-1/3 flex justify-end">
        <CiSearch className="h-6 w-6 flex mx-3"/>
          <IoBagHandleOutline className="h-6 w-6 flex mx-3"/>
            {/* <h2 className="text-2xl pr-5 border-white border-2 rounded-md flex px-4">Signin</h2> */}
            <a href={'/pages/login'}><FaRegUser className="h-5 w-5 mx-3 mt-1"/></a>
        </div>
      </div>
      <div className="pt-24"> {/* Add this div to push the content below the navbar */}
        {/* Page content goes here */}
      </div>
    </>
  );
}

export default Navbar;
