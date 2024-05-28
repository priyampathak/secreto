"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Loading from "@/app/components/Loading";
import { FaRegHeart } from "react-icons/fa";
import { IoMdGitCompare } from "react-icons/io";
import { IoMdShare } from "react-icons/io";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa";
import { FaApplePay } from "react-icons/fa";
import Navbarnor from "@/app/components/Navbarnor";
import Footer from "@/app/components/Footer";
import Dropdown from "@/app/components/Dropdown";

const apiUrl = process.env.API_BASE_URL;

function Page({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [itemCount, setItemCount] = useState(1);
  const { data: session, status } = useSession();
  const [cart, setCart] = useState({ userId: null, cartItems: [] });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.product}`);
        const responseData = await res.json();
        setProduct(responseData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [params.product]);

  useEffect(() => {
    // Save session data to local storage
    localStorage.setItem("session", JSON.stringify(session));
  }, [session]);

  const handleAddToCart = () => {
    if (selectedSizeIndex !== null) {
      const selectedSize = product.sizes[selectedSizeIndex];
      const cartItem = {
        productId: product._id,
        quantity: itemCount,
        size: selectedSize.size,
      };
  
      // Retrieve existing cart from local storage
      const existingCart = JSON.parse(localStorage.getItem("cart")) || {
        cartItems: [],
      };
  
      const existingItemIndex = existingCart.cartItems.findIndex(
        (item) => item.productId === cartItem.productId && item.size === cartItem.size
      );
  
      if (existingItemIndex !== -1) {
        // If item already exists, display alert
        alert("This item is already in your cart.");
      } else {
        // Otherwise, add the new item to the cart
        existingCart.cartItems.push(cartItem);
  
        // Update cart state with new cart items
        const updatedCart = { cartItems: existingCart.cartItems };
        setCart(updatedCart);
  
        // Save updated cart data to storage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
  
        // Display success message
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 2000);
  
        // console.log("Cart Item Added:", cartItem);
      }
    } else {
      // Display error message
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 2000);
    }
  };
  

  const handleQuantityChange = (amount) => {
    setItemCount(Math.max(1, itemCount + amount));
  };

  const handleSizeSelection = (index) => {
    setSelectedSizeIndex(index);
    setSelectedPrice(product.sizes[index].price);
  };

  const handleCheckout = () => {
    // Retrieve existing cart from local storage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || {
      cartItems: [],
    };

    if (existingCart.cartItems.length > 0) {
      // Proceed to checkout only if there are items in the cart
      router.push("/pages/cart");
    } else {
      // Display error message indicating the cart is empty
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 2000);
    }
  };

  if (!product) {
    return <Loading />;
  }

  return (
    <>
      <Navbarnor />
      <div className="w-screen h-auto lg:px-20 py-20">
        <div
          className="py-10 lg:py-20 flex"
          onClick={() => {
            router.back();
          }}
        >
          <h1 className="text-3xl pt-1 px-2">↩</h1>
          <h1 className="text-2xl">Back to collections</h1>
        </div>

        <div className="w-full h-full flex flex-wrap">
          <div className="lg:w-32 w-0">
            <Image
              src={product.img_2}
              height={100}
              width={100}
              alt="img"
              className="py-2"
            />
            <Image
              src={product.img_main}
              height={100}
              width={100}
              alt="img"
              className="py-2"
            />
            <Image
              src={product.img_3}
              height={100}
              width={100}
              alt="img"
              className="py-2"
            />
            <Image
              src={product.img_4}
              height={100}
              width={100}
              alt="img"
              className="py-2"
            />
          </div>

          <div className="px-20">
            <Image
              src={product.img_main}
              height={420}
              width={420}
              alt="img"
              className="py-2"
              priority
            />
          </div>

          <div className="flex justify-center px-6">
            <div>
              <h1 className="text-4xl">{product.name}</h1>
              <h1 className="text-gray-500 py-2">{product.short_description}</h1>
              <hr className="w-full my-4" />
              <div className="flex">
                <h1 className="text-black font-semibold pr-2">Targets</h1>
                <h1 className="text-gray-500 font-semibold pr-2">
                  {product.targets}
                </h1>
              </div>
              <hr className="w-full my-4" />
              <div className="flex">
                <h1 className="text-black font-semibold pr-2">For</h1>
                <h1 className="text-gray-500 font-semibold pr-2">{product.for}</h1>
              </div>
              <hr className="w-full my-4" />
              <div className="flex">
                <h1 className="text-black font-semibold pr-2">
                  Dermologically tested
                </h1>
                <h1 className="text-gray-500 font-semibold pr-2">
                  {product.dermologically_tested}
                </h1>
              </div>
              <hr className="w-full my-4" />
              <h1 className="text-2xl py-4 text-gray-500">
                Cost: ${selectedPrice !== null ? selectedPrice : product.min_cost}
              </h1>
              <div className="flex flex-wrap gap-4 py-6">
                {product.sizes.map((size, index) => (
                  <button
                    key={size._id}
                    className={`px-5 py-3 rounded ${
                      index === selectedSizeIndex
                        ? "border-black border-2 bg-orange-500 text-white"
                        : size.stock === 0
                        ? "bg-gray-300 text-gray-400"
                        : "bg-orange-500 text-white"
                    }`}
                    onClick={() => handleSizeSelection(index)}
                    disabled={size.stock === 0}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
              <hr className="w-full my-4" />
              <div className="flex">
                <div className="flex pr-4">
                  <button className="pt-1 h-4 w-4 pr-2">
                    <FaRegHeart />
                  </button>
                  <h1 className="px-2">Wishlist</h1>
                </div>
                <div className="flex pr-4">
                  <button className="pt-1 h-4 w-4 pr-2">
                    <IoMdGitCompare />
                  </button>
                  <h1 className="px-2">Compare</h1>
                </div>
                <div className="flex pr-4">
                  <button className="pt-1 h-4 w-4 pr-2">
                    <IoMdShare />
                  </button>
                  <h1 className="px-2">Share</h1>
                </div>
              </div>
              <div className="flex">
                <div className="flex py-14">
                  <button
                    className="lg:px-5 px-3 lg:pl-6 lg:py-3 border-black"
                    style={{ borderWidth: '1px', borderRight: '0px' }}
                    onClick={() => handleQuantityChange(-1)}
                  >
                    -
                  </button>
                  <h1
                    className="text-lg pt-2 lg:pt-3 lg:px-5 px-3 lg:py-3 text-black text-center border-black"
                    style={{ borderWidth: '1px', borderRight: '0px', borderLeft: '0px' }}
                  >
                    {itemCount}
                  </h1>
                  <button
                    className="lg:px-5 px-3 lg:py-3 border-black"
                    style={{ borderWidth: '1px', borderLeft: '0px' }}
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                  <button
                    className="lg:px-20 px-10 py-3 bg-orange-400 mx-8"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              {showSuccessMessage && (
                <div className="mt-4 text-green-500">Item added to cart successfully!</div>
              )}
              {showErrorMessage && (
                <div className="mt-4 text-red-500">
                  Please select a size or your cart is empty.
                </div>
              )}
              <button className="lg:py-4 lg:px-44 px-36 py-4 bg-gray-300" onClick={()=>{handleCheckout()}}>
                  Checkout
                </button>
              <hr className="w-full my-6" />
              <h1 className="text-xl">Guaranteed Safe Checkout</h1>
              <div className="py-4 flex gap-4">
                <RiVisaLine size={40} />
                <FaCcMastercard size={40} />
                <FaApplePay size={40} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
      <div className=" w-full px-2">
        <Dropdown title="Benefits" paragraph={product.benefits}/>
        <Dropdown title="Ingredients" paragraph={product.ingredients}/>
        <Dropdown title="Instructions" paragraph={product.instructions}/>
        </div>
        
      </div>
      <Footer />
    </>
  );
}

export default Page;
