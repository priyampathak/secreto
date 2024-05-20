import React from "react";
import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";

function Navbarnor() {
  return (
    <>
      <div className=" w-screen overflow-hidden">
        <div className="fixed top-0 pt-4 left-0 w-full flex px-20 pb-4 z-50 text-white bg-black">
          <div className="w-1/3">
            <h2 className="text-2xl font-semibold">CARMELL</h2>
          </div>
          <div className="w-1/3 flex justify-center">
            <h2 className="text-xl pr-5">Science</h2>
            <h2 className="text-xl pr-5">Shop</h2>
            <h2 className="text-xl pr-5">Corporate</h2>
          </div>
          <div className="w-1/3 flex justify-end">
            <CiSearch className="h-6 w-6 flex mx-3" />
            <IoBagHandleOutline className="h-6 w-6 flex mx-3" />
            {/* <h2 className="text-2xl pr-5 border-white border-2 rounded-md flex px-4">Signin</h2> */}
            <a href={"/pages/login"}>
              <FaRegUser className="h-5 w-5 mx-3 mt-1" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbarnor;
