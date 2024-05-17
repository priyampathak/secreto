'use client'
import Navbar from '@/app/components/Navbar'
import React, { useEffect, useRef, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import face_neck from '../../.././public/home-image/face-neck.jpg'
import under_eye from '@/public/home-image/under-eye.jpg'
import body from '@/public/home-image/body.jpg'
import med_spa from '@/public/home-image/med-spa.jpg'
import serum from '@/public/home-image/serum.webp'
import blackwhite from '@/public/home-image/blackwhite.webp'
import no_foul from '@/public/no-foul.webp'
import micro_emu from '@/public/micro-emu.webp'
import Image from 'next/image';
import reviews from '@/app/dummy-rev';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '@/app/components/Footer';


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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

  // Initial window width
  setWindowWidth(window.innerWidth)
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
    
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Adjust autoplay speed as needed (in milliseconds)
  };

  
  return (
    <>
    {windowWidth < 1030 ? (
        <Navbar />
      ) : (
        <div className="fixed top-0 pt-4 left-0 w-full flex px-20 pb-4 z-50 text-white"
          style={{ backgroundColor: navbarBgColor, transition: 'background-color 0.5s' }}>
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
      )
      }
      <div className="py-6 overflow-hidden">
        
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
            <source src="/Carmell-home.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="p-4 flex justify-center">
          <p className="text-5xl font-light">Carmell Collections</p>
          <div style={{ height: '120px' }}></div>
        </div>
        {/* start of 4 slide images */}
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
        {/* end of 4 slide images */}

        {/* start of serum */}
        <div className="flex w-screen mx-10 my-6">
          <div className="w-1/2">
          <Image 
            src={serum}
            width={650} 
            height={600} 
          />
          </div>
          <div className="w-1/2 py-14 pl-10">
            <h1 className="text-4xl py-4">
              Carmell Club
            </h1>
            <ul className="list-disc ml-4 w-3/5 text-gray-500">
              <li className="py-2">The Carmell Club is a community of discerning beauty icons who demand high-performance, luxury skincare. We expect better than mass market products.</li>
              <li className="py-2">Our members are powerful, busy people with no time for fussy and incomplete skincare routines.</li>
              <li className="py-2">Our members have access to the best professional insights and science.</li>
              <li className="py-2">Our skincare reflects our commitment to a healthy lifestyle that extends our love and enjoyment of the la dolce vita.</li>
            </ul>
            <button className=" border-black p-3 px-5 text-black my-4 hover:bg-orange-500 hover:text-white" style={{borderWidth: '1px'}}>
                Learn More
            </button>
          </div>          
        </div>
        {/* end of serum */}
        {/* start of the balck and white */}
        <div className="flex w-screen my-8 mx-12">
            <div className="w-1/2">
            <Image 
              src={blackwhite}
              width={650} 
              height={600} 
            />
            </div>
            <div className="w-1/2 py-14 pl-10">
              <h1 className="text-4xl py-4 ">
                Carmell Secretome<sup className=" text-black font-semibold text-base"><sup className=" font-extrabold text-base">TM</sup></sup>
              </h1>
              <p className="w-3/4 py-4 text-gray-500">
              Carmell spent 7 years and over $60 million developing the Carmell Secretome containing 1000+ growth factors, proteins and peptides derived from Human Platelet Enriched Plasma.
              </p>
              <button className=" border-black p-3 px-5 text-black my-4 hover:bg-orange-500 hover:text-white" style={{borderWidth: '1px'}}>
                Learn More
              </button>
            </div>
          </div>
          {/* end of the balck and white */}
          <div className="w-screen py-10">
            <h1 className="text-center text-3xl font-medium">Carmell Cosmetics Complete Care</h1>

            {/* start of 4 videos */}
            <div className="mx-20 my-16 flex">
              <div className="w-1/4 mx-3">
                <video autoPlay loop muted className=" h-72 w-72" style={{ borderTopLeftRadius: '6rem', borderTopRightRadius: '1rem',
                  borderBottomRightRadius: '6rem', borderBottomLeftRadius: '1rem'
                }} >
                <source src="/carmell-spec.mp4" type="video/mp4" />
                </video>
                <h1 className="text-center pr-4 my-10 font-semibold text-lg">Carmell Secretome</h1>
              </div>
              <div className="w-1/4 mx-3">
                <video autoPlay loop muted className=" h-72 w-72" style={{ borderTopLeftRadius: '6rem', borderTopRightRadius: '1rem',
                  borderBottomRightRadius: '6rem', borderBottomLeftRadius: '1rem'
                }} >
                <source src="/bio-lipids.mp4" type="video/mp4" />
                </video>
                <h1 className="text-center pr-4 my-10 font-semibold text-lg">Bio Lipids</h1>
              </div>
              <div className="w-1/4 mx-3">
                <video autoPlay loop muted className=" h-72 w-72" style={{ borderTopLeftRadius: '6rem', borderTopRightRadius: '1rem',
                  borderBottomRightRadius: '6rem', borderBottomLeftRadius: '1rem'
                }} >
                <source src="/bio-hydration.mp4" type="video/mp4" />
                </video>
                <h1 className="text-center pr-4 my-10 font-semibold text-lg">Bio Hydration</h1>
              </div>
              <div className="w-1/4 mx-3">
                <video autoPlay loop muted className=" h-72 w-72" style={{ borderTopLeftRadius: '6rem', borderTopRightRadius: '1rem',
                  borderBottomRightRadius: '6rem', borderBottomLeftRadius: '1rem'
                }} >
                <source src="/carmell-spec.mp4" type="video/mp4" />
                </video>
                <h1 className="text-center pr-4 my-10 font-semibold text-lg">Carmell Secretome</h1>
              </div>
            </div>
            {/* video of 4 videos */}
          </div>
          
          {/* two arraow starts */}
          <div className="mb-8 justify-center flex w-screen">
            <div className="">
              <Image src={no_foul} height={580} width={580} />
            </div>
            <div className="">
              <Image src={micro_emu} height={580} width={580} />
            </div>
          </div>
          {/* two arraow ends */}

          {/* start backed by and doctor */}
          <div className="w-screen my-24">
            <div>
                <h1 className="text-center text-gray-500">Backed By</h1>
                <h1 className="text-center text-3xl">Leading Doctors</h1>
            </div>
          </div>
          {/* start backed by and doctor */}

          {/* start of slide show */}
          <div className="w-screen">
            <Slider {...settings} >
              {reviews.map((review) => (
                <div key={review.id} className="w-screen">
                  <div key={review.id} className="p-4 w-6/6 mx-7 h-72 rounded-md shadow-lg shadow-gray-400 my-2" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)' }}>
                  <Image src={review.image} height={100} width={100} />
                  <p className="my-6 text-gray-400">
                    {review.review}
                  </p>
                  <h1 className="text-gray-400 italic">{review.name}</h1>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          {/* start of slide show */}

          {/* <div className="mx-28 flex">
            {
              reviews.map((review) => (
                <div className="p-4 w-1/3 h-80 rounded-md shadow-lg shadow-gray-400 mx-4" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)' }}>
                  <Image src={review.image} height={100} width={100} />
                  <p className="my-6 text-gray-400">
                    {review.review}
                  </p>
                  <h1 className="text-gray-400 italic">{review.name}</h1>
                </div>
              ))
            }
            
          </div> */}

          
      </div>
      <Footer />
    </>
  )
}

export default Page
