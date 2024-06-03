'use client'
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { AiOutlineProduct } from "react-icons/ai";
import img from '@/public/carmell.PNG'
import Image from 'next/image';
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaUserPen } from "react-icons/fa6";
import Products_admin from '@/app/components/admin/Products_admin';
import Order_admin from '@/app/components/admin/Order_admin';
import Users from '@/app/components/admin/Users';
function Page() {

  const [selectedComponent, setSelectedComponent] = useState(null);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'products':
        return <Products_admin />;
      case 'orders':
        return <Order_admin />;
      case 'users':
        return <Users />;
      default:
        return <div className="h-screen my-4">
            <h1 className="text-2xl p-4">Welcome To Admin Dashboard</h1>
            
          </div>;
    }
  };


  return (
    <div className="w-screen h-screen overflow-hidden flex">
      <div className=" w-1/5 h-full bg-gray-200">
        <div className='py-16 flex justify-center items-center'>
          <Image 
            src={img}
            height={200}
            width={200}
            alt='logo'
            />
        </div>
        <div className="py-4  bg-gray-300 m-6 rounded-md" onClick={() => setSelectedComponent('products')} >
          <div className='flex justify-center items-center'>
            <AiOutlineProduct className="h-10 w-10"/>
          </div>
          <h1 className="text-center py-2">Products</h1>
        </div>

        <div className="py-4  bg-gray-300 m-6 rounded-md" onClick={() => setSelectedComponent('orders')} >
          <div className='flex justify-center items-center'>
            <LiaShippingFastSolid className="h-10 w-10"/>
          </div>
          <h1 className="text-center py-2">Orders</h1>
        </div>

        <div className="py-4  bg-gray-300 m-6 rounded-md">
          <div className='flex justify-center items-center'>
            <FaUserPen className="h-10 w-10"/>
          </div>
          <h1 className="text-center py-2">Users</h1>
        </div>
        
      </div>
      <div className="w-4/5 h-full" style={{  overflowY: 'scroll' }}>
      {renderComponent()}
      </div>
    </div>
  )
}

export default Page
