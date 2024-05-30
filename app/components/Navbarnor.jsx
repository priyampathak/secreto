import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";

function Navbarnor() {
  const [menu, setMenu] = useState(0)
  const router = useRouter()
  return (
    <>
      <div className="w-screen overflow-hidden" style={{position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000, // Ensure it's on top of other elements
  backgroundColor: 'white', // Ensure it has a background
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'}}>
        <div className={`fixed pt-4 left-0 w-full ${menu === 1 ? 'h-72' : 'h-16'} bg-black`}>
          <div className={`flex px-10 lg:px-20 pb-4 text-white`}>
            <div className="w-1/2 lg:w-1/3">
              <h2 className="text-2xl lg:font-semibold">CARMELL</h2>
            </div>
            <div className="hidden lg:w-1/3 lg:flex lg:justify-center ">
              <button className="text-xl pr-5" onClick={()=>{router.push(`/pages/shop`);}}>Shop</button>
              <h2 className="text-xl pr-5">Science</h2>
              <h2 className="text-xl pr-5">Corporate</h2>
            </div>
            <div className="hidden lg:w-1/3 lg:flex lg:justify-end">
              {/* <CiSearch className="h-6 w-6 flex mx-3" /> */}
              <IoBagHandleOutline className="h-6 w-6 flex mx-3" onClick={()=>{router.push('/pages/cart')}}/>
              {/* <h2 className="text-2xl pr-5 border-white border-2 rounded-md flex px-4">Signin</h2> */}
              
                <FaRegUser className="h-5 w-5 mx-3 mt-1" onClick={()=>{router.push('/pages/login')}}/>
              
            </div>
            <div className="lg:hidden w-1/2 flex justify-end">
              {
                menu == 1 ? 
                (
                  <h1 className="text-white "onClick={()=>{setMenu(0)}}><RxCross2 className="h-7 w-7"/></h1>
                ) : (
                  <h1 className="text-white "onClick={()=>{setMenu(1)}}><CiMenuFries className="h-7 w-7"/></h1>
                )
              }
            </div>
          </div>
          {
            menu==1 ?
            (
              <div className="w-full h-full bg-black flex justify-center pt-8">
                <div>
                  <h1 className="text-xl text-center text-white py-2" onClick={()=>{router.push(`/pages/shop`);}}>Shop</h1>
                  <h1 className="text-xl text-center text-white py-2" onClick={()=>{router.push('/pages/cart')}}>Cart</h1>
                  <h2 className="text-xl text-center text-white py-2">Science</h2>
                  <h2 className="text-xl text-center text-white py-2">Corporate</h2>
                  <a href={"/pages/login"}><h2 className="text-xl text-center text-white py-2">Profile</h2></a>
                </div>
              </div>
            ):(<></>)
          }
          
        </div>
      </div>
    </>
  );
}

export default Navbarnor;


// {
//   menu == 1 ? (<>
//     <div>
//       <h1 className="text-blue-700 text-3xl">jwiod</h1>
//     </div>
//   </>):(<></>)
// }