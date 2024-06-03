import React from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";

function UserInit() {
  return (
    <section className="text-gray-600 h-full body-font"style={{  overflowY: 'scroll' }}>
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h2 className="text-xs text-orange-700 tracking-widest font-medium title-font mb-1">CARMEL WELCOMES YOU</h2>
      <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Read this before you start</h1>
    </div>
    <div className="flex flex-wrap -m-4">
      <div className="p-4 md:w-1/3">
        <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-orange-600 text-white flex-shrink-0">
              <FaRegCircleUser />
            </div>
            <h2 className="text-gray-900 text-lg title-font font-medium">Profile Section</h2>
          </div>
          <div className="flex-grow">
            <p className="leading-relaxed text-base">Profile section helps you to manage and edit your profile related all the information in just on click.</p>
           
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/3">
        <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-orange-600 text-white flex-shrink-0">
              <FaShippingFast />
            </div>
            <h2 className="text-gray-900 text-lg title-font font-medium">Order & Shipping</h2>
          </div>
          <div className="flex-grow">
            <p className="leading-relaxed text-base">This section helps you to manage and track you orders and shippings. You can also see your all orders summary here.</p>
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/3">
        <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-orange-600 text-white flex-shrink-0">
             <MdOutlineSettings />
            </div>
            <h2 className="text-gray-900 text-lg title-font font-medium">Settings</h2>
          </div>
          <div className="flex-grow">
            <p className="leading-relaxed text-base">Here you can handle all your settings related to this website. Also you can get in touch we us, through this section. </p>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default UserInit
