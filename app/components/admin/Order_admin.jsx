"use client";
import React, { useState, useEffect } from "react";

const Order_admin = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingOrderId, setLoadingOrderId] = useState(null);
  const [reloadComponent, setReloadComponent] = useState(false); 

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    
    

    fetchOrders();
    fetchProducts();
  }, [reloadComponent]);

  const getProductById = (productId) => {
    const product = products.find((product) => product._id === productId);
    return product ? product.name : "Unknown Product";
  };

  const handleChange = (event, orderId) => {
    const newStatus = event.target.value;
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, order_status: newStatus } : order
      )
    );
  };

  const handleUpdateOrderStatus = async (orderId) => {
    const orderToUpdate = orders.find((order) => order._id === orderId);
    if (!orderToUpdate) return;

    setLoadingOrderId(orderId);

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_status: orderToUpdate.order_status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      setReloadComponent(prev => !prev);

      const updatedOrder = await response.json();

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setLoadingOrderId(null);
    }
  };

  return (
    <div className="p-16 text-2xl" style={{  overflowY: 'scroll' }}>
      Orders Management
      {orders.map((order) => (
        <div key={order._id} className="h-auto w-full my-4 p-2 bg-gray-200 rounded-md items-center">
          <div className="flex my-3">
            <div className="flex mx-2">
              <h1 className="text-sm mx-1 font-bold text-orange-700">Order ID:</h1>
              <h1 className="text-sm">{order._id}</h1>
            </div>
            <div className="flex mx-2">
              <h1 className="text-sm mx-1 font-bold text-orange-700">Order Cost:</h1>
              <h1 className="text-sm">${order.subTotal}</h1>
            </div>
            <div className="flex mx-2">
              <h1 className="text-sm mx-1 font-bold text-orange-700">Number of Items:</h1>
              <h1 className="text-sm">{order.products ? order.products.length : 0}</h1>
            </div>
            <div className="flex mx-2">
              <h1 className="text-sm mx-1 font-bold text-orange-700">Order Date:</h1>
              <h1 className="text-sm">{order.order_date}</h1>
            </div>
            <div className="flex mx-2">
              <h1 className="text-sm mx-1 font-bold text-orange-700">Order Status:</h1>
              <select value={order.order_status} onChange={(event) => handleChange(event, order._id)} className="text-sm">
                <option value="Ordered">Ordered</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Packaging">Packaging</option>
                <option value="Refunded">Refunded</option>
                <option value="Disputed">Disputed</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Returned">Returned</option>
              </select>
            </div>
          </div>
          <div className="flex my-3">
            <div className="flex mx-2">
              <h1 className="text-sm mx-1 font-bold text-orange-700">Order Email:</h1>
              <h1 className="text-sm">{order?.formData?.email}</h1>
            </div>
            <div className="flex mx-2">
              <h1 className="text-sm mx-1 font-bold text-orange-700">Country:</h1>
              <h1 className="text-sm">India</h1>
            </div>
            <div className="flex mx-2">
              <h1 className="text-sm mx-1 font-bold text-orange-700">City:</h1>
              <h1 className="text-sm">{order?.formData?.city}</h1>
            </div>
            <div className="flex mx-2">
              <h1 className="text-sm mx-1 font-bold text-orange-700">Zip:</h1>
              <h1 className="text-sm">{order?.formData?.zip}</h1>
            </div>
            <div className="flex mx-2">
              <h1 className="text-sm mx-1 font-bold text-orange-700">Street or House Number:</h1>
              <h1 className="text-sm">{order?.formData?.house}</h1>
            </div>
          </div>
          {order.products && order.products.map((product, index) => (
            <div key={index} className="my-2 text-sm flex mx-2">
              <div className="flex mx-2">
                <h1 className="text-orange-700">Product Name: </h1>
                <h1>{getProductById(product.productId)}</h1>
              </div>
              <div className="flex mx-2">
                <h1 className="text-orange-700">Product Quantity: </h1>
                <h1>{product.quantity}</h1>
              </div>
              <div className="flex mx-2">
                <h1 className="text-orange-700">Product Size: </h1>
                <h1>{product.size}</h1>
              </div>
              <div className="flex mx-2">
                <h1 className="text-orange-700">Product Price: </h1>
                <h1>${product.price}</h1>
              </div>
            </div>
          ))}
          <div className="bg-black rounded-md text-white text-sm text-center p-1">
            <button onClick={() => handleUpdateOrderStatus(order._id)}>
              {loadingOrderId === order._id ? "Updating..." : "Update Order Status"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order_admin;
