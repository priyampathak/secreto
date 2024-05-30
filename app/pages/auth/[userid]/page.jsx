'use client'
import Navbarnor from '@/app/components/Navbarnor'
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import UserInit from '@/app/components/user/UserInit';
import { CgLogOut } from "react-icons/cg";
import Profile from '@/app/components/user/Profile';
import Orders from '@/app/components/user/Orders';
import Settings from '@/app/components/user/Settings';

function page({params}) {
  const { data: session, status } = useSession()
  const router = useRouter();
  const [selectedComponent, setSelectedComponent] = useState(null);

  console.log(params.userid)
  useEffect(() => {
    // Check if session exists and redirect if true
    if (!session) {
      router.push('/pages/home');
    }
  }, [session]);

  if (status === 'loading') {
    return null
  }

  // Function to render the selected component
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'user':
        return <Profile />;
      case 'orders':
        return <Orders />;
      case 'settings':
        return <Settings />;
      default:
        return <div>
            <h1 className="text-2xl">Welcome Back</h1>
            <h1>{session?.user?.name}</h1>
            <UserInit />
          </div>;
    }
  };

  return (
    <>
      <Navbarnor />
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


        <div className="w-full px-10 py-6 h-full">
        {renderComponent()}
        </div>
      </div>
    </>
  )
}

export default page
