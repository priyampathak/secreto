'use client'
import React from 'react';
import Image from 'next/image'; // Import this only if you are using next.js, otherwise use a regular img tag
import { MdDelete } from "react-icons/md";

function CartItem({ price, quantity, img, product_name, onIncrement, onDecrement, onRemove, size }) {
  return (
    <div className="w-full">
      <div className="flex my-4">
        <div className="w-20 lg:w-1/5 lg:flex h-auto">
          <img src={img} height={100} width={100} alt='img' />
          <div className="flex items-center">
            <div className="text-gray-500 text-sm">
              {product_name}
            </div>
          </div>
        </div>
        <div className="w-1/5 flex h-auto">
          <div className="flex items-center justify-center w-full">
            <h1 className="text-gray-500 text-sm text-center">
              {size}
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
              className="h-5 w-6 border-gray-400 rounded-md flex items-center justify-center lg:bg-orange-500 lg:text-white"
              style={{ borderWidth: '1px' }}
              onClick={onDecrement}
            >
              -
            </button>
            <h1 className="text-gray-500 text-sm text-center px-2 lg:px-3">
              {quantity}
            </h1>
            <button
              className="h-5 w-6 border-gray-400 rounded-md flex items-center justify-center lg:bg-orange-500 lg:text-white"
              style={{ borderWidth: '1px' }}
              onClick={onIncrement}
            >
              +
            </button>
          </div>
        </div>
        <div className="w-1/5 flex h-auto">
          <div className="flex items-center justify-center w-full">
            <h1 className="text-gray-500 text-sm text-center">
              ${quantity * price}
            </h1>
          </div>
        </div>
        
      </div>
      <div className=" h-auto">
          <div className="flex items-center w-full text-red-700 py-2">
            <button onClick={onRemove}>Remove</button>
          </div>
      </div>
      <hr className="my-6"></hr>
    </div>
  );
}

export default CartItem;
