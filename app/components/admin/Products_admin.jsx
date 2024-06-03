"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Product_create from "./Product_create";

function Products_admin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({});
  const [isCreate, setCreate] = useState(0);

  useEffect(() => {
    // Fetch products
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));

    // Fetch categories
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  if (products.length === 0 || categories.length === 0) {
    return <div>Loading...</div>;
  }

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const getImageSrc = (url) => {
    return isValidUrl(url) ? url : "/fallback_image.jpg"; // Replace "/fallback_image.jpg" with a valid fallback image path
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(category => category._id === categoryId);
    return category ? category.category_name : "Unknown Category";
  };

  const handleDelete = (id) => {
    setLoading(prev => ({ ...prev, [id]: 'deleting' }));
    fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setProducts(products.filter(product => product._id !== id));
      })
      .catch(error => console.error('Error deleting product:', error))
      .finally(() => {
        setLoading(prev => ({ ...prev, [id]: null }));
      });
  };

  const handleUpdate = (updatedProduct) => {
    setLoading(prev => ({ ...prev, [updatedProduct._id]: true }));
    fetch(`/api/products/${updatedProduct._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then(response => response.json())
      .then(() => {
        setProducts(prevProducts => prevProducts.map(product => {
          if (product._id === updatedProduct._id) {
            return updatedProduct;
          }
          return product;
        }));
      })
      .catch(error => console.error('Error updating product:', error))
      .finally(() => {
        setLoading(prev => ({ ...prev, [updatedProduct._id]: false }));
      });
  };

  const handleInputChange = (e, productId, field) => {
    const { value } = e.target;
    setProducts(prevProducts =>
      prevProducts.map(product => {
        if (product._id === productId) {
          return { ...product, [field]: value };
        }
        return product;
      })
    );
  };

  const handleInputChangeo = (e, productId, field, index) => {
    const { value } = e.target;
    setProducts(prevProducts =>
      prevProducts.map(product => {
        if (product._id === productId) {
          const updatedSizes = product.sizes.map((size, i) => {
            if (i === index) {
              return { ...size, [field]: value };
            }
            return size;
          });
          return { ...product, sizes: updatedSizes };
        }
        return product;
      })
    );
  };

  const typeOptions = ["launched", "prelaunched", "not for sale online"];

  return (
    <div className="p-16" style={{  overflowY: 'scroll' }}>
      <h1 className="text-xl py-6">Products and Stock Management</h1>
      {
        isCreate == 1 ? (
          <Product_create />
        )
        : (<></>)
      }
      <button className="my-4 bg-black p-2 text-white rounded-md"
      onClick={()=>{setCreate(1)}}>Create a Product</button>

      {products.map(product => (
        <div key={product._id} className="flex flex-wrap px-4 py-2 bg-gray-200 mb-4">
          <div>
            <Image src={getImageSrc(product.img_main)} height={100} width={100} alt="img" />
          </div>
          <div>
            <div className="ml-2 my-1">
              <label>Product Name</label>
              <br />
              <input type="text" className="w-52" value={product.name} 
              onChange={(e) => handleInputChange(e, product._id, 'name')} />
            </div>
            <div className="ml-2 my-1">
              <label>Short Description</label>
              <br />
              <input type="text" className="w-52" value={product.short_description}
               onChange={(e) => handleInputChange(e, product._id, 'short_description')} />
            </div>
            <div className="ml-2 my-1">
              <label>Target</label>
              <br />
              <input type="text" className="w-52" value={product.targets} 
               onChange={(e) => handleInputChange(e, product._id, 'targets')} />
            </div>
            <div className="ml-2 my-1">
              <label>For</label>
              <br />
              <input type="text" className="w-52" value={product.for} 
               onChange={(e) => handleInputChange(e, product._id, 'for')} />
            </div>
          </div>

          <div>
            <div className="ml-2 my-1">
              <label>Dermologically Tested</label>
              <br />
              <input type="text" className="w-52" value={product.dermologically_tested} 
               onChange={(e) => handleInputChange(e, product._id, 'dermologically_tested')} />
            </div>
            <div className="ml-2 my-1">
              <label>Ingredients</label>
              <br />
              <input type="text" className="w-52" value={product.ingredients}
               onChange={(e) => handleInputChange(e, product._id, 'ingredients')} />
            </div>
            <div className="ml-2 my-1">
              <label>Instructions</label>
              <br />
              <input type="text" className="w-52" value={product.instructions}
               onChange={(e) => handleInputChange(e, product._id, 'instructions')} />
            </div>
          </div>

          <div>
            <div className="ml-2 my-1">
              <label>Image Main URL</label>
              <br />
              <input type="text" className="w-52" value={product.img_main} 
               onChange={(e) => handleInputChange(e, product._id, 'img_main')} />
            </div>
            <div className="ml-2 my-1">
              <label>Image 2 URL</label>
              <br />
              <input type="text" className="w-52" value={product.img_2} 
               onChange={(e) => handleInputChange(e, product._id, 'img_2')} />
            </div>
            <div className="ml-2 my-1">
              <label>Image 3 URL</label>
              <br />
              <input type="text" className="w-52" value={product.img_3}
               onChange={(e) => handleInputChange(e, product._id, 'img_3')} />
            </div>
            <div className="ml-2 my-1">
              <label>Image 4 URL</label>
              <br />
              <input type="text" className="w-52" value={product.img_4}
               onChange={(e) => handleInputChange(e, product._id, 'img_4')} />
            </div>
          </div>

          <div>
            <div className="ml-2 my-1">
              <label>Minimum Cost</label>
              <br />
              <input type="text" className="w-52" value={product.min_cost}
               onChange={(e) => handleInputChange(e, product._id, 'min_cost')} />
            </div>
            <div className="ml-2 my-1">
              <label>Category</label>
              <br />
              <select className="w-52" defaultValue={product.category_id} 
               onChange={(e) => handleInputChange(e, product._id, 'category_id')}>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="ml-2 my-1">
              <label>Type</label>
              <br />
              <select
                className="w-52"
                value={product.type}
                onChange={(e) => handleInputChange(e, product._id, 'type')}
              >
                {typeOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="ml-2 my-1">
              <label>Benefits</label>
              <br />
              <input type="text" className="w-52" value={product.benefits} 
               onChange={(e) => handleInputChange(e, product._id, 'benefits')} />
            </div>
          </div>

          <div className="w-full mt-4">
            <h2 className="text-lg py-2">Sizes and Prices</h2>
            {product.sizes.map((size, index) => (
              <div key={size._id} className="ml-2 my-1">
                <label>Size {index + 1}</label>
                <br />
                <input
                  type="text"
                  className="w-24"
                  value={size.size}
                  onChange={(e) => handleInputChangeo(e, product._id, 'size.size', index)}
                />
                <input
                  type="text"
                  className="w-24 ml-2"
                  value={size.price}
                  onChange={(e) => handleInputChangeo(e, product._id, 'price', index)}
                />
                <input
                  type="text"
                  className="w-24 ml-2"
                  value={size.stock}
                  onChange={(e) => handleInputChangeo(e, product._id, 'stock', index)}
                />
              </div>
            ))}
          </div>

          <div className="w-full mt-4">
            <button
              className="bg-red-500 text-white py-1 px-3 mr-2"
              onClick={() => handleDelete(product._id)}
              disabled={loading[product._id] === 'deleting'}
            >
              {loading[product._id] === 'deleting' ? 'Loading...' : 'Delete'}
            </button>
            <button
              className="bg-blue-500 text-white py-1 px-3"
              onClick={() => handleUpdate(product)}
              disabled={loading[product._id]}
            >
              {loading[product._id] ? 'Loading...' : 'Update'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products_admin;
