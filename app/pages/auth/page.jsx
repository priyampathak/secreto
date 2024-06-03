'use client'
// pages/index.js
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";
import Navbarnor from '@/app/components/Navbarnor'
import Navbar from '@/app/components/Navbar'
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import UserInit from '@/app/components/user/UserInit';
import { CgLogOut } from "react-icons/cg";
import Profile from '@/app/components/user/Profile';
import Orders from '@/app/components/user/Orders';
import Settings from '@/app/components/user/Settings';

function Page() {
  const { data: session, status } = useSession()
  const router = useRouter();
  const [selectedComponent, setSelectedComponent] = useState(null);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'user':
        return <Profile />;
      case 'orders':
        return <Orders />;
      case 'settings':
        return <Settings />;
      default:
        return <div className="h-screen my-4">
            <h1 className="text-2xl">Welcome Back</h1>
            <h1>{session?.user?.name}</h1>
            <UserInit className=" h-full"/>
          </div>;
    }
  };

  useEffect(() => {
    // Check if user is logged in and process user data
    if (session) {
      const { name, email } = session.user;
      const [firstName, lastName] = name.split(' ');
      
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based
      const day = String(today.getDate()).padStart(2, '0');
      const currentDate = `${year}-${month}-${day}`;

      // Check if user exists in the database
      fetch(`/api/users/${email}`)
        .then((response) => {
          if (!response.ok) {
            // User not found, so post user data to the API
            fetch('/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                fullname: name,
                email_status: "unverified",
                mobile: "",
                mobile_status: "unverified",
                user_status: 1,
                member_since: currentDate,
                country: "",
                city: "",
                zip: "",
                house_number: "",
                street_name: ""
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data); // Handle API response as needed
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          } else {
            console.log('User already exists');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [session]);
  

  if (status === 'loading') {
    return null
  }

  return (
    <> 
    <Navbarnor />
      
        {/* if user not logged in */}
        {!session ? (
          
          <div className="w-screen h-screen flex justify-center items-center">

            <div className="h-auto w-full lg:w-1/3 bg-white lg:py-10 py-6 lg:px-6 px-4 rounded-md">
              <h1 className="text-black text-4xl py-6 text-center">CARMELL</h1>
              <h1 className=" text-black font-extrabold py-4">One Tap Login or Sign up</h1>
              <button className=" bg-red-800 text-white w-full h-10 rounded-md my-2" onClick={()=>signIn("google")}>Continue With Google</button>
              
              <div className="my-4">
                <h1 className="text-blue-700">Privacy</h1>
                <h1 className="text-blue-700">Back to home</h1>
              </div>
            </div>
           </div>
        
        ) : (
          <>
           <div className=" flex mt-16 w-screen h-screen overflow-hidden">
       <div className="w-14 lg:w-24 bg-gray-300 h-screen">
        <div className="my-14">

        </div>
        <button className=" w-full flex my-8 justify-center items-center"
        onClick={() => setSelectedComponent('user')}> 
          <FaRegCircleUser className="h-6 lg:h-10 w-7 lg:w-12 text-gray-500"/>
        </button>
        <button className=" w-full my-8 flex justify-center items-center"
        onClick={() => setSelectedComponent('orders')}> 
          <FaShippingFast className="h-6 lg:h-8 w-7 lg:w-12 text-gray-500"/>
        </button>
        <button className=" w-full my-6 flex justify-center items-center"
        onClick={() => setSelectedComponent('settings')}> 
          <MdOutlineSettings className="h-6 lg:h-10 w-7 lg:w-12 text-gray-500"/>
        </button>
        <button className=" w-full my-6 flex justify-center items-center"
        onClick={() => signOut()}> 
          <CgLogOut className="h-6 lg:h-10 w-7 lg:w-12 text-gray-500"/>
        </button>
       </div>


        <div className="w-full px-10 py-6">
        {renderComponent()}
        </div>
      </div>
          </>
        )}

    </>
  )
}

export default Page
