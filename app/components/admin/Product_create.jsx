"use client";
import React, { useState, useEffect } from "react";

function ProductCreate() {
  const typeOptions = ["launched", "prelaunched", "not for sale online"];
  const [sizes, setSizes] = useState([{ size: "", price: "", stock: "" }]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [target, setTarget] = useState("");
  const [forField, setForField] = useState("");
  const [dermologicallyTested, setDermologicallyTested] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageMain, setImageMain] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [minCost, setMinCost] = useState("");
  const [type, setType] = useState("");
  const [benefits, setBenefits] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch categories from the API
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const addMoreSize = () => {
    setSizes([...sizes, { size: "", price: "", stock: "" }]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newSizes = [...sizes];
    newSizes[index][name] = value;
    setSizes(newSizes);
  };

  const handleDelete = (index) => {
    const newSizes = sizes.filter((_, i) => i !== index);
    setSizes(newSizes);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const productData = {
      name: productName,
      short_description: shortDescription,
      benefits,
      category_id: selectedCategory,
      targets: target,
      for: forField,
      dermologically_tested: dermologicallyTested,
      ingredients,
      instructions,
      min_cost: minCost,
      img_main: imageMain,
      img_2: image2,
      img_3: image3,
      img_4: image4,
      sizes,
      type,
    };

    console.log(productData);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        // Handle successful response
        alert("Product Added")
        console.log("Product created successfully");
      } else {
        // Handle error response
        alert("Error to add product")
        console.error("Error creating product");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-3/4 w-auto">
      <h1 className="text-2xl">Create Product</h1>
      <div className="my-4 bg-gray-600 py-3 rounded-md p-2 text-white">
        <div className="flex flex-wrap p-2 bg-gray-600 py-3 rounded-md text-white m-auto">
          <div className="w-1/5 mx-4">
            <div className="ml-2 my-1">
              <label>Product Name</label>
              <br />
              <input
                type="text"
                className="w-52 bg-gray-300 text-black"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="ml-2 my-1">
              <label>Short Description</label>
              <br />
              <input
                type="text"
                className="w-52 bg-gray-300 text-black"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />
            </div>
            <div className="ml-2 my-1">
              <label>Target</label>
              <br />
              <input
                type="text"
                className="w-52 bg-gray-300 text-black"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
            <div className="ml-2 my-1">
              <label>For</label>
              <br />
              <input
                type="text"
                className="w-52 bg-gray-300 text-black"
                value={forField}
                onChange={(e) => setForField(e.target.value)}
              />
            </div>
          </div>

          <div className="w-1/5 mx-4">
            <div className="ml-2 my-1">
              <label>Dermologically Tested</label>
              <br />
              <input
                type="text"
                className="w-52 bg-gray-300 text-black"
                value={dermologicallyTested}
                onChange={(e) => setDermologicallyTested(e.target.value)}
              />
            </div>
            <div className="ml-2 my-1">
              <label>Ingredients</label>
              <br />
              <input
                type="text"
                className="w-52 bg-gray-300 text-black"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>
            <div className="ml-2 my-1">
              <label>Instructions</label>
              <br />
              <input
                type="text"
                className="w-52 bg-gray-300 text-black"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>
          </div>

          <div className="w-1/5 mx-4">
            <div className="ml-2 my-1">
              <label>Image Main URL</label>
              <br />
              <input
                type="text"
                className="w-52 bg-gray-300 text-black"
                value={imageMain}
                onChange={(e) => setImageMain(e.target.value)}
              />
            </div>
            <div className="ml-2 my-1">
              <label>Image 2 URL</label>
              <br />
              <input
                type="text"
                className="w-52 bg-gray-300 text-black"
                value={image2}
                onChange={(e) => setImage2(e.target.value)}
              />
            </div>
            <div className="ml-2 my-1">
              <label>Image 3 URL</label>
              <br />
              <input
                type="text"
                className="w-52 bg-gray-300 text-black"
                value={image3}
                onChange={(e) => setImage3(e.target.value)}
              />
            </div>
            <div className="ml-2 my-1">
              <label>Image 4 URL</label>
              <br />
              <input
                type="text"
                className="w-52 bg-gray-300 text-black"
                value={image4}
                onChange={(e) => setImage4(e.target.value)}
              />
            </div>
          </div>

          <div className="w-1/5 mx-4">
            <div className="ml-2 my-1">
              <label>Minimum Cost</label>
              <br />
              <input
                type="text"
                className="w-52 bg-gray-300 text-black"
                value={minCost}
                onChange={(e) => setMinCost(e.target.value)}
              />
            </div>
            <div className="ml-2 my-1">
              <label>Category</label>
              <br />
              <select
                className="w-52 bg-gray-300 text-black"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {/* Placeholder option with the default selected value */}
                <option value="" disabled hidden>
                  Select Category
                </option>
                {/* Map through categories */}
                {categories.map((category) => (
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
                className="w-52 bg-gray-300 text-black"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {/* Placeholder option with the default selected value */}
                <option value="" disabled hidden>
                  Select Type
                </option>
                {/* Map through typeOptions */}
                {typeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="ml-2 my-1">
              <label>Benefits</label>
              <br />
              <input
                type="text"
                className="w-52 bg-gray-300 text-black"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <button
            className="p-1 bg-orange-600 text-white rounded-md my-3"
            onClick={addMoreSize}
          >
            Add more size
          </button>
        </div>
        {sizes.map((size, index) => (
          <div className="flex my-2" key={index}>
            <div className="mx-4">
              <label>Size:</label>
              <br />
              <input
                type="text"
                name="size"
                value={size.size}
                onChange={(event) => handleInputChange(index, event)}
                className="w-32 bg-gray-300 text-black"
              />
            </div>
            <div className="mx-4">
              <label>Price:</label>
              <br />
              <input
                type="text"
                name="price"
                value={size.price}
                onChange={(event) => handleInputChange(index, event)}
                className="w-32 bg-gray-300 text-black"
              />
            </div>
            <div className="mx-4">
              <label>Stock:</label>
              <br />
              <input
                type="text"
                name="stock"
                value={size.stock}
                onChange={(event) => handleInputChange(index, event)}
                className="w-32 bg-gray-300 text-black"
              />
            </div>
            <div className="mx-4 flex items-center">
              <button
                className="p-1 mt-5 bg-red-700 text-white rounded-md"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="p-1 bg-blue-600 text-white rounded-md"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Loading..." : "Post Product"}
      </button>
    </div>
  );
}

export default ProductCreate;
