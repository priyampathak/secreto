import React, { useEffect, useState } from 'react';
import { CiMenuFries } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";


function Navbar() {
  const [windowWidth, setWindowWidth] = useState(null);
  const [menu, setMenu] = useState(0)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  if (windowWidth === null) {
    return null
  }

  return (
    <>
      <div className="w-screen h-auto overflow-hidden">
        {/* code for dropdown menu */}
        { menu == 1 ? 
        (
          <div className="w-screen h-80 bg-black py-6 px-6">
            <div className="flex w-full">
              <div className="w-1/2">
                <h1 className="text-white text-xl">CARMELL</h1>
              </div>
              <div className="w-1/2 flex justify-end">
                <h1 className="text-white " onClick={()=>{setMenu(0)}}><RxCross2 className="h-7 w-7"/></h1>
              </div>
            </div>
            <div className="w-full flex justify-center my-8">
              <div>
                <h1 className="text-white text-lg text-center py-2">Science</h1>
                <h1 className="text-white text-lg text-center py-2">Shop</h1>
                <h1 className="text-white text-lg text-center py-2">Corporate</h1>
                <h1 className="text-white text-lg text-center py-2">Cart</h1>
                <h1 className="text-white text-lg text-center py-2">Profile</h1>
              </div>
            </div>
        </div>
        ) : (
          // code for undrop-down menu
          <div className="w-screen bg-black py-6 px-6">
            <div className="flex w-full">
              <div className="w-1/2">
                <h1 className="text-white text-xl">CARMELL</h1>
              </div>
              <div className="w-1/2 flex justify-end">
                <h1 className="text-white "onClick={()=>{setMenu(1)}}><CiMenuFries className="h-7 w-7"/></h1>
              </div>
            </div>
            <div>
            </div>
        </div>
        )
        }
      </div>
    </>
  );
}

export default Navbar;
