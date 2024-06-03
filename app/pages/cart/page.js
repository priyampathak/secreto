'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import CartItem from '@/app/components/Cart_item';
import Billing from '@/app/components/Billing';

function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [productInfo, setProductInfo] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProductInfo = async (productId, size, quantity) => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (response.ok) {
          const productData = await response.json();
          const selectedSize = productData.sizes.find((s) => s.size === size);
          if (selectedSize) {
            const totalPrice = selectedSize.price * quantity;
            setProductInfo((prevProductInfo) => ({
              ...prevProductInfo,
              [`${productId}-${size}`]: {
                ...productData,
                selectedSizePrice: selectedSize.price,
                totalPrice: totalPrice,
              },
            }));
          }
        } else {
          console.error('Failed to fetch product info:', response.status);
        }
      } catch (error) {
        console.error('Error fetching product info:', error);
      }
    };

    const cartData = localStorage.getItem('cart');
    if (cartData) {
      const parsedCartData = JSON.parse(cartData);
      setCartItems(parsedCartData.cartItems);
      parsedCartData.cartItems.forEach((item) => {
        fetchProductInfo(item.productId, item.size, item.quantity);
      });
    }
  }, []);

  useEffect(() => {
    const totalAmount = cartItems.reduce((acc, item) => {
      const productKey = `${item.productId}-${item.size}`;
      const itemPrice = productInfo[productKey]?.selectedSizePrice || 0;
      return acc + item.quantity * itemPrice;
    }, 0);
    setTotal(totalAmount);
  }, [cartItems, productInfo]);

  const handleIncrement = (productId, size) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.productId === productId && item.size === size) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    const updatedCartData = { cartItems: updatedCartItems };
    localStorage.setItem('cart', JSON.stringify(updatedCartData));
    setCartItems(updatedCartItems);
  };

  const handleDecrement = (productId, size) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.productId === productId && item.size === size) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter((item) => item.quantity > 0);

    const updatedCartData = { cartItems: updatedCartItems };
    localStorage.setItem('cart', JSON.stringify(updatedCartData));
    setCartItems(updatedCartItems);
  };

  const handleRemove = (productId, size) => {
    const updatedCartItems = cartItems.filter((item) => !(item.productId === productId && item.size === size));
    const updatedCartData = { cartItems: updatedCartItems };
    localStorage.setItem('cart', JSON.stringify(updatedCartData));
    setCartItems(updatedCartItems);
  };

  // console.log('cartItems', cartItems);
  // console.log('productInfo', productInfo);

  return (
    <>
      <div className="h-full w-screen bg-gray-200 px-5 lg:px-20 py-16 overflow-hidden">
        <div className="flex my-6 w-full">
          <h1 className="font-semibold text-2xl w-1/2">Your cart</h1>
          <button className="w-1/2 text-end text-blue-700 pt-2 pr-3" onClick={() => { router.push('/pages/shop') }}>Back to shopping</button>
        </div>

        {session ? (
          <h2 className="text-sm my-4">Hello, {session.user.name.split(' ')[0]}</h2>
        ) : (
          <div className="flex">
            <h2 className="text-sm my-4">You are not logged in!</h2>
            <button className="text-sm my-4 ml-3 text-blue-600" onClick={() => { router.push('/pages/login') }}>Click here to login</button>
          </div>
        )}

        <div className="w-full bg-white rounded-md p-8 shadow-lg shadow-gray-400">
          {cartItems.length === 0 ? (
            <p>Your cart has nothing.</p>
          ) : (
            <>
              <div className=" hidden lg:flex w-full font-extrabold">
                <div className="w-1/5 font-sans text-black" style={{ fontWeight: 600 }}>Product</div>
                <div className="w-1/5 text-center font-sans text-black" style={{ fontWeight: 600 }}>Size</div>
                <div className="w-1/5 text-center font-sans text-black" style={{ fontWeight: 600 }}>Price</div>
                <div className="w-1/5 text-center font-sans text-black" style={{ fontWeight: 600 }}>Quantity</div>
                <div className="w-1/5 text-center font-sans text-black" style={{ fontWeight: 600 }}>Total</div>
              </div>

              {cartItems.map((item, index) => {
                const productKey = `${item.productId}-${item.size}`;
                return (
                  <CartItem
                    key={index}
                    img={productInfo[productKey]?.img_main}
                    product_name={productInfo[productKey]?.name}
                    price={productInfo[productKey]?.selectedSizePrice}
                    quantity={item.quantity}
                    size={item.size}
                    totalPrice={productInfo[productKey]?.totalPrice}
                    onIncrement={() => handleIncrement(item.productId, item.size)}
                    onDecrement={() => handleDecrement(item.productId, item.size)}
                    onRemove={() => handleRemove(item.productId, item.size)}
                  />
                );
              })}
              <h1>Sub Total</h1><h1 className="text-black text-2xl">${total}</h1>
            </>
          )}
        </div>




          {/* billing form */}



          {cartItems.length > 0 && total > 0 && (
            <Billing sub={total} cartItems={cartItems} productInfo={productInfo} />
          )}
      </div>
    </>
  );
}

export default Page;
