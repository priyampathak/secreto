"use client"
import React, { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';

function Billing({ sub }) {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    house: "",
    landmark: "",
    zip: "",
  });

  const [cart, setCart] = useState([{}]);

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    
    if (cartData) {
      setCart([cartData]);

    }
    if (session) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: session.user.email || "",
        
      }));
    }
  }, [session]);

  console.log("cart is", cart)
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { firstName, lastName, phone, email, city, house, landmark, zip } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName || !lastName || !phone || !email || !city || !house || !landmark || !zip) {
      alert("Please fill in all required fields.");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be 10 digits.");
      return false;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!/^\d+$/.test(zip)) {
      alert("Zip code must be a number.");
      return false;
    }
    return true;
  };


  // const handleSubmit = () => {
  //   if (validateForm()) {
  //     console.log("Form Data:", formData);
  //     console.log("Cart Data:", cart);
  //     console.log("Subtotal:", sub);
  //   }
  // };

  const handleSubmit = async () => {
    if(validateForm()){
      const products = cart.map((items) => {
        const cartItems = JSON.parse(items).cartItems; // Parse the JSON string to access the cartItems array
        return cartItems.map((item) => ({ // Returning an object inside map
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
          price: item.price
        }));
      }).flat(); 
      console.log("pro are",products)
      let response = await fetch("/api/orders",{
        method:'POST',
        
        body:JSON.stringify({
          
          products: products,
          totalAmount: sub,
          formData: formData,
          paymentStatus: 'paid', // You can set the payment status here
          subTotal: sub,
          createdAt: ""
        })
        
      })
      if(response.status == 200){
        alert("created")
      }else{
        alert("not created")
      }
    }
  };
  


  return (
    <div className="w-full">
      <div className="w-full p-8 my-8 bg-white rounded-md">
        <div className="w-full font-bold font-sans mb-8">Billing Details</div>
        <div className="flex flex-wrap w-full">
          <input
            type="text"
            name="firstName"
            placeholder="First Name *"
            className="p-2 mx-1 border-black w-72 my-2"
            style={{ borderWidth: "1px" }}
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name *"
            className="p-2 mx-1 border-black w-72 my-2"
            style={{ borderWidth: "1px" }}
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-wrap w-screen">
          <input
            type="text"
            name="phone"
            placeholder="Phone *  (+1)"
            className="p-2 mx-1 my-2 border-black w-72"
            style={{ borderWidth: "1px" }}
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            className="p-2 mx-1 my-2 border-black w-72"
            style={{ borderWidth: "1px" }}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
        </div>
        <div className="flex flex-wrap w-screen">
          <select
            className="p-2 mx-1 my-2 border-black w-72"
            style={{ borderWidth: "1px" }}
            defaultValue="United States"
            disabled
          >
            <option value="United States">United States</option>
          </select>
          <br />
          <input
            type="text"
            name="city"
            placeholder="City *"
            className="p-2 mx-1 my-2 border-black w-72"
            style={{ borderWidth: "1px" }}
            value={formData.city}
            onChange={handleChange}
            required
          />
          <br />
        </div>
        <h1 className="my-1">Shipping details</h1>
        <input
          type="text"
          name="house"
          placeholder="House Number and Street Name"
          className="p-2 mx-1 my-2 border-black w-72"
          style={{ borderWidth: "1px" }}
          value={formData.house}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="landmark"
          placeholder="Landmark"
          className="p-2 mx-1 my-2 border-black w-72"
          style={{ borderWidth: "1px" }}
          value={formData.landmark}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="zip"
          placeholder="Zip Code"
          className="p-2 mx-1 my-2 border-black w-72"
          style={{ borderWidth: "1px" }}
          value={formData.zip}
          onChange={handleChange}
          required
        />
        <br />
        <div className="my-4 w-full flex justify-center">
          <button className="bg-orange-400 text-white p-2" onClick={handleSubmit}>
            Proceed To Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Billing;
