"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image'

function Orders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("Ordered");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleChange = (event, orderId) => {
    // You can add logic here to update the status in the backend if needed
    setStatus(event.target.value);
    // Update the order status locally (just for demonstration)
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, order_status: event.target.value } : order
      )
    );
  };

  return (
    <div className="lg:p-16 text-2xl" style={{  overflowY: 'scroll' }}>
      Track Your Orders
      {orders.map((order) => (
        <div key={order._id} className="h-auto w-full my-4 p-2 bg-gray-200 rounded-md  items-center">
          <div className="flex my-3 flex-wrap">
            <div className="flex mx-2 flex-wrap">
              <h1 className="text-sm mx-1 font-bold text-orange-700">Order ID:</h1>
              <h1 className="text-sm">{order._id}</h1>
            </div>
            <div className="flex mx-2 flex-wrap">
              <h1 className="text-sm mx-1 font-bold text-orange-700">Order Cost:</h1>
              <h1 className="text-sm">${order.subTotal}</h1>
            </div>
            <div className="flex mx-2 flex-wrap">
              <h1 className="text-sm mx-1 font-bold text-orange-700">Number of Items:</h1>
              <h1 className="text-sm">{order.products.length}</h1>
            </div>
            <div className="flex mx-2 flex-wrap">
              <h1 className="text-sm mx-1 font-bold text-orange-700">Order Date:</h1>
              <h1 className="text-sm">{order.order_date}</h1>
            </div>
            <div className="flex mx-2 flex-wrap">
              <h1 className="text-sm mx-1 font-bold text-orange-700">Order Status:</h1>
              <h1 className="text-sm">
              {order.order_status}
              </h1>
            </div>
          </div>
          <div className="flex my-3 flex-wrap">
            <div className="flex mx-2 flex-wrap">
              <h1 className="text-sm mx-1 font-bold text-orange-700">Order Email:</h1>
              <h1 className="text-sm">{order.formData.email}</h1>
            </div>
            <div className="flex mx-2 flex-wrap">
              <h1 className="text-sm mx-1 font-bold text-orange-700">Country:</h1>
              <h1 className="text-sm">India</h1>
            </div>
            <div className="flex mx-2 flex-wrap">
              <h1 className="text-sm mx-1 font-bold text-orange-700">City:</h1>
              <h1 className="text-sm">{order.formData.city}</h1>
            </div>
            <div className="flex mx-2 flex-wrap">
              <h1 className="text-sm mx-1 font-bold text-orange-700">Zip:</h1>
              <h1 className="text-sm">{order.formData.zip}</h1>
            </div>
            <div className="flex mx-2 flex-wrap">
              <h1 className="text-sm mx-1 font-bold text-orange-700">Street or House Number:</h1>
              <h1 className="text-sm">{order.formData.house}</h1>
            </div>
          </div>
          {order.products.map((product, index) => (
            <div key={index} className="my-2 text-sm flex mx-2 flex-wrap">
              <div className="flex mx-2 flex-wrap">
                <h1 className="text-orange-700">Product Name: </h1>
                <h1>{product.productId}</h1>
              </div>
              <div className="flex mx-2 flex-wrap">
                <h1 className="text-orange-700">Product Quantity: </h1>
                <h1>{product.quantity}</h1>
              </div>
              <div className="flex mx-2 flex-wrap">
                <h1 className="text-orange-700">Product Size: </h1>
                <h1>{product.size}</h1>
              </div>
              
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};


export default Orders
