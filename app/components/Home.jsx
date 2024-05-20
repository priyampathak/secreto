import React from "react";
import Image from "next/image";
import img from "@/public/home-mobile/face-neck.jpg";
import under_eye from "@/public/home-mobile/under-eye.jpg";
import body from "@/public/home-mobile/body.jpg";
import med_spa from "@/public/home-mobile/med-spa.jpg";
import serum from "@/public/home-mobile/serum.webp";
import blackwhite from "@/public/home-mobile/blackwhite.webp";
import { FaInstagramSquare } from "react-icons/fa";
import no_foul from "@/public/no-foul.webp";
import micro_emu from "@/public/micro-emu.webp";
import reviews from "@/app/dummy-rev";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Adjust autoplay speed as needed (in milliseconds)
  };
  return (
    <>
      <div className="w-screen h-auto overflow-hidden">
        {/* after nav top section */}
        <div>
          <Image
            src={img}
            height={500}
            width={500}
            alt="top image"
            className="h-96 w-full"
          />
        </div>
        {/* after nav top section ends*/}

        {/* 4 images section starts*/}
        <div className="w-full my-10 flex">
          <div className="w-full">
            <div>
              <h1 className="text-center w-full text-2xl py-4">
                Carmell Collections
              </h1>
            </div>
            <div>
              <div className="w-full relative px-6 py-1 ">
                <Image
                  src={img}
                  height={200}
                  width={200}
                  className="rounded-sm w-full"
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center px-6">
                  <h1
                    className="text-center bg-white bg-opacity-20 w-full p-2 text-lg"
                    style={{ marginBottom: "5px" }}
                  >
                    FACE & NECK
                  </h1>
                </div>
              </div>
              <div className="w-full relative px-6 py-1">
                <Image
                  src={under_eye}
                  height={200}
                  width={200}
                  className="rounded-sm w-full"
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center px-6">
                  <h1
                    className="text-center bg-white bg-opacity-20 w-full p-2 text-lg"
                    style={{ marginBottom: "5px" }}
                  >
                    UNDER EYE
                  </h1>
                </div>
              </div>
              <div className="w-full relative px-6 py-1">
                <Image
                  src={body}
                  height={200}
                  width={200}
                  className="rounded-sm w-full"
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center px-6">
                  <h1
                    className="text-center bg-white bg-opacity-20 w-full p-2 text-lg"
                    style={{ marginBottom: "5px" }}
                  >
                    BODY
                  </h1>
                </div>
              </div>
              <div className="w-full relative px-6 py-1">
                <Image
                  src={med_spa}
                  height={200}
                  width={200}
                  className="rounded-sm w-full"
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center px-6">
                  <h1
                    className="text-center bg-white bg-opacity-20 w-full p-2 text-lg"
                    style={{ marginBottom: "5px" }}
                  >
                    MED SPA
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 4 images section ends */}

        {/* carmell club section starts */}
        <div className="w-screen h-screen justify-center my-10">
          <div className="">
            <Image src={serum} height={6000} width={7000} className="" />
          </div>
          <div className="">
            <h1 className="text-3xl py-4 text-center">Carmell Club</h1>
            <ul className="list-disc my-6 text-gray-500 px-8">
              <li className="py-2">
                The Carmell Club is a community of discerning beauty icons who
                demand high-performance, luxury skincare. We expect better than
                mass market products.
              </li>
              <li className="py-2">
                Our members are powerful, busy people with no time for fussy and
                incomplete skincare routines.
              </li>
              <li className="py-2">
                Our members have access to the best professional insights and
                science.
              </li>
              <li className="py-2">
                Our skincare reflects our commitment to a healthy lifestyle that
                extends our love and enjoyment of the la dolce vita.
              </li>
            </ul>
            <div className="flex justify-center">
              <button
                className=" border-black p-3 px-5 text-black my-4 hover:bg-orange-500 hover:text-white"
                style={{ borderWidth: "1px" }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
        {/* carmell club section ends */}

        {/* carmell sectretome section starts */}
        <div className="w-full h-full justify-center ">
          <div className="p-6">
            <Image src={blackwhite} height={6000} width={7000} className="" />
            <div className="">
              <h1 className="text-3xl py-6 text-center">
                Carmell Secretome
                <sup className=" text-black font-semibold text-base">
                  <sup className=" font-extrabold text-base">TM</sup>
                </sup>
              </h1>
              <p className="text-gray-500 px-2">
                Carmell spent 7 years and over $60 million developing the
                Carmell Secretome containing 1000+ growth factors, proteins and
                peptides derived from Human Platelet Enriched Plasma.
              </p>
            </div>
            <div className="flex justify-center my-4">
              <button
                className=" border-black p-3 px-5 text-black my-4 hover:bg-orange-500 hover:text-white"
                style={{ borderWidth: "1px" }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
        {/* carmell sectretome section ends */}

        {/* 4 videos section starts */}
        <div className="w-full h-full my-0 flex justify-center">
          <div>
            <div className="py-6">
              <video
                autoPlay
                loop
                muted
                className=" h-96 w-96"
                style={{
                  borderTopLeftRadius: "6rem",
                  borderTopRightRadius: "1rem",
                  borderBottomRightRadius: "6rem",
                  borderBottomLeftRadius: "1rem",
                }}
              >
                <source src="/carmell-spec.mp4" type="video/mp4" />
              </video>
              <h1 className="text-center pr-4 font-semibold text-lg py-3">
                Carmell Secretome
              </h1>
            </div>
            <div className="py-6">
              <video
                autoPlay
                loop
                muted
                className=" h-96 w-96"
                style={{
                  borderTopLeftRadius: "6rem",
                  borderTopRightRadius: "1rem",
                  borderBottomRightRadius: "6rem",
                  borderBottomLeftRadius: "1rem",
                }}
              >
                <source src="/bio-lipids.mp4" type="video/mp4" />
              </video>
              <h1 className="text-center pr-4 font-semibold text-lg py-3">
                Bio Lipids
              </h1>
            </div>
            <div className="py-6">
              <video
                autoPlay
                loop
                muted
                className=" h-96 w-96"
                style={{
                  borderTopLeftRadius: "6rem",
                  borderTopRightRadius: "1rem",
                  borderBottomRightRadius: "6rem",
                  borderBottomLeftRadius: "1rem",
                }}
              >
                <source src="/bio-hydration.mp4" type="video/mp4" />
              </video>
              <h1 className="text-center pr-4 font-semibold text-lg py-3">
                Bio Hydration
              </h1>
            </div>
            <div className="py-6">
              <video
                autoPlay
                loop
                muted
                className=" h-96 w-96"
                style={{
                  borderTopLeftRadius: "6rem",
                  borderTopRightRadius: "1rem",
                  borderBottomRightRadius: "6rem",
                  borderBottomLeftRadius: "1rem",
                }}
              >
                <source src="/carmell-spec.mp4" type="video/mp4" />
              </video>
              <h1 className="text-center pr-4 font-semibold text-lg py-3">
                Carmell Secretome
              </h1>
            </div>
          </div>
        </div>
        {/* 4 videos section ends */}

        {/* 2 Arrow Image starts */}
        <div className="w-full h-full px-2">
          <div>
            <div className="">
              <Image src={no_foul} height={580} width={580} />
            </div>
            <div className="">
              <Image src={micro_emu} height={580} width={580} />
            </div>
          </div>
        </div>
        {/* 2 Arrow image ends */}

        {/* start backed by and doctor */}
        <div className="w-full h-full px-2 my-8">
          <div>
            <h1 className="text-center text-gray-500">Backed By</h1>
            <h1 className="text-center text-3xl">Leading Doctors</h1>
          </div>
        </div>
        {/* ends backed by and doctor */}
        
        {/* Doctor review starts */}
        <div className="w-full h-full my-6">
          <Slider {...settings}>
            {reviews.map((review) => (
              <div key={review.id} className="w-screen">
                <div
                  key={review.id}
                  className="p-4 w-6/6 mx-7 h-72 rounded-md shadow-lg shadow-gray-400 my-2"
                  style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)" }}
                >
                  <Image src={review.image} height={100} width={100} />
                  <p className="my-6 text-gray-400">{review.review}</p>
                  <h1 className="text-gray-400 italic">{review.name}</h1>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        {/* Doctor review ends */}
      </div>
    </>
  );
}

export default Home;
