"use client";
import Navbar from "@/app/components/Navbar";
import Navbarnor from "@/app/components/Navbarnor";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";
import { useRouter } from "next/navigation";
import img from '@/public/products/Face & Neck/Products/ReGenerative Elixir Square/Regenerative Elixir Square Render 2.jpg';
import Footer from "@/app/components/Footer";

const apiUrl = process.env.API_BASE_URL;

function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products`);
        const response2 = await fetch(`/api/categories`);
        const data = await response.json();
        const data2 = await response2.json()
        console.log(data2)
        setProducts(data);
        setCategories(data2.reduce((acc, category) => {
          acc[category._id] = category.category_name;
          return acc;
        }, {}));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const isSoldOut = (sizes) => {
    return sizes.every(size => size.stock < 1);
  };

  // Organize products by category
  const categorizedProducts = products.reduce((acc, product) => {
    const { category_id } = product;
    const categoryName = categories[category_id];
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(product);
    return acc;
  }, {});

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbarnor />
      <div className="w-screen h-screen lg:px-20 py-20">
        {Object.keys(categorizedProducts).map(categoryId => (
          <div key={categoryId} className="pt-10">
            <h1 className="text-2xl font-light text-gray-700 px-10 lg:px-0">
              {categoryId}
            </h1>
            <div className="flex w-full h-auto flex-wrap py-10">
              {categorizedProducts[categoryId].map(product => (
                <div key={product._id} className="px-2 py-2">
                  <Image
                    src={product.img_main}
                    height={450}
                    width={400}
                    alt={product.name}
                    data-map="true"
                  />
                  <h1 className="text-center pt-6 text-2xl font-light text-black">
                    {product.name}
                  </h1>
                  <h1 className="text-center pt-0 text-lg font-light text-gray-600">
                    ${product.min_cost}
                  </h1>
                  <div className="flex justify-center">
                    {isSoldOut(product.sizes) ? (
                      <button
                        className="mt-2 w-5/6 border-black h-14 bg-gray-400 text-white cursor-not-allowed"
                        style={{ borderWidth: "1px" }}
                        disabled
                      >
                        Sold Out
                      </button>
                    ) : product.type === "not for sale online" ? (
                      <button
                        className="mt-2 w-5/6 border-black h-14 hover:bg-orange-400 hover:text-white hover:border-white"
                        style={{ borderWidth: "1px" }}
                        onClick={() => router.push(`/products/${product._id}/learn-more`)}
                      >
                        Learn More
                      </button>
                    ) : product.type === "prelaunched" ? (
                      <button
                        className="mt-2 w-5/6 border-black h-14 bg-gray-400 text-white cursor-not-allowed"
                        style={{ borderWidth: "1px" }}
                        disabled
                      >
                        Coming Soon
                      </button>
                    ) : (
                      <button
                        className="mt-2 w-5/6 border-black h-14 hover:bg-orange-400 hover:text-white hover:border-white"
                        style={{ borderWidth: "1px" }}
                        onClick={() => router.push(`/pages/shop/${product._id}`)}
                      >
                        Buy Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
      </div>
      
    </>
  );
}

export default Page;