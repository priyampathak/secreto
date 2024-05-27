'use client'
import React, { useState } from 'react';
import Image from 'next/image'; // Import this only if you are using next.js, otherwise use a regular img tag

function CartItem({ price, quantity, img, product_name }) {
  const [qn, setQn] = useState(quantity);

  return (
    <div className="w-full">
      <div className="flex my-4">
        <div className="w-2/5 flex h-auto">
          <Image
            src={img}
            height={100}
            width={100}
            alt='img'
          />
          <div className="flex items-center">
            <h1 className="text-gray-500 text-sm">
              {product_name}
            </h1>
          </div>
        </div>
        <div className="w-1/5 flex h-auto">
          <div className="flex items-center justify-center w-full">
            <h1 className="text-gray-500 text-sm text-center">
              ${price}
            </h1>
          </div>
        </div>
        <div className="w-1/5 flex h-auto">
          <div className="flex items-center justify-center w-full">
            <button 
              className="h-5 w-6 border-gray-400 rounded-md flex items-center justify-center" 
              style={{borderWidth: '1px'}}
              onClick={() => { setQn(qn > 0 ? qn - 1 : 0); }}
            >
              -
            </button>
            <h1 className="text-gray-500 text-sm text-center px-1">
              {qn}
            </h1>
            <button 
              className="h-5 w-6 border-gray-400 rounded-md flex items-center justify-center" 
              style={{borderWidth: '1px'}} 
              onClick={() => { setQn(qn + 1); }}
            >
              +
            </button>
          </div>
        </div>
        <div className="w-1/5 flex h-auto">
          <div className="flex items-center justify-center w-full">
            <h1 className="text-gray-500 text-sm text-center">
              ${qn * price}
            </h1>
          </div>
        </div>
      </div>
      <hr className="my-6"></hr>
    </div>
  );
}

export default CartItem;
