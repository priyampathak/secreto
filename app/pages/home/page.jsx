'use client'
import Navbar from '@/app/components/Navbar'
import React, { useEffect, useRef, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import face_neck from '../../.././public/home-image/face-neck.jpg'
import under_eye from '@/public/home-image/under-eye.jpg'
import body from '@/public/home-image/body.jpg'
import med_spa from '@/public/home-image/med-spa.jpg'
import Image from 'next/image';

function Page() {
  const videoRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [marginTop, setMarginTop] = useState(0);
  const [navbarBgColor, setNavbarBgColor] = useState('transparent');

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const newScale = Math.max(0.4, 1 - scrollPosition / 100); // Adjust the denominator for desired scaling effect
    setScale(newScale);

    // Calculate margin top to keep the video centered
    const newMarginTop = Math.max(0, (window.innerHeight - (window.innerHeight * newScale)) / 2);
    setMarginTop(newMarginTop);

    // Change navbar background color
    if (scrollPosition <= 100) {
      setNavbarBgColor('transparent');
    } else if (scrollPosition <= 200) {
      setNavbarBgColor('grey');
    } else {
      setNavbarBgColor('black');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="py-6 overflow-hidden">
        <div className="fixed top-0 pt-6 left-0 w-full flex px-20 border-b-2 pb-8 z-50 text-white"
          style={{ backgroundColor: navbarBgColor, transition: 'background-color 0.5s' }}>
          <div className="w-1/3">
            <h2 className="text-3xl font-semibold">SECRETO</h2>
          </div>
          <div className="w-1/3 flex justify-center">
            <h2 className="text-2xl pr-5">Science</h2>
            <h2 className="text-2xl pr-5">Shop</h2>
            <h2 className="text-2xl pr-5">Corporate</h2>
          </div>
          <div className="w-1/3 flex justify-end">
            <h2 className="text-2xl pr-7">Cart</h2>
            {/* <h2 className="text-2xl pr-5 border-white border-2 rounded-md flex px-4">Signin</h2> */}
            <a href={'/pages/login'}><FaRegUser className="h-7 w-7 flex "/></a>
          </div>
        </div>
        {/* End of navbar */}
        <div className="flex justify-center items-center overflow-hidden" style={{ height: '100vh' }}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            style={{
              transform: `scale(${scale})`,
              transition: 'transform 0.2s ease-out, margin-top 0.2s ease-out',
              marginTop: `${marginTop}px`,
            }}
            className="absolute"
          >
            <source src="/facespa.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="p-4 flex justify-center">
          <p className="text-5xl font-light">Carmell Collections</p>
          <div style={{ height: '120px' }}></div>
        </div>
         {/* Mid portion face neck */}

        <div className="mx-20 flex">
          <div className="w-1/4 relative mr-6 h-5/6">
            <Image src={face_neck} height={300} width={300} className="rounded-sm"/>
            <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center ">
              <h1 className="text-center bg-black bg-opacity-20 w-full p-2 font-medium">Face & Neck</h1>
            </div>
          </div>
          <div className="w-1/4 relative mr-6 h-5/6">
            <Image src={under_eye} height={300} width={300} className="rounded-sm"/>
            <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center ">
              <h1 className="text-center bg-black bg-opacity-20 w-full p-2 font-medium">Undder Eye</h1>
            </div>
          </div>
          <div className="w-1/4 relative mr-6 h-5/6">
            <Image src={body} height={300} width={300} className="rounded-sm"/>
            <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center ">
              <h1 className="text-center bg-black bg-opacity-20 w-full p-2 font-medium">Body</h1>
            </div>
          </div>
          <div className="w-1/4 relative mr-6 h-5/6">
            <Image src={med_spa} height={300} width={300} className="rounded-sm"/>
            <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center ">
              <h1 className="text-center bg-black bg-opacity-20 w-full p-2 font-medium">Med Spa</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
