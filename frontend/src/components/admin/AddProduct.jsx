import { useState } from "react";

import {
  createProduct,
} from "../../services/productService";

function AddProduct() {

  const [formData,
    setFormData] =
    useState({

      title: "",

      description: "",

      category: "",

      price: "",

      quantity: "",
    });

  const [image,
    setImage] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  // INPUT CHANGE
  const handleChange = (
    e
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // IMAGE CHANGE
  const handleImageChange = (
    e
  ) => {

    setImage(
      e.target.files[0]
    );
  };

  // SUBMIT
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const data =
          new FormData();

        data.append(
          "title",
          formData.title
        );

        data.append(
          "description",
          formData.description
        );

        data.append(
          "category",
          formData.category
        );

        data.append(
          "price",
          formData.price
        );

        data.append(
          "quantity",
          formData.quantity
        );

        data.append(
          "image",
          image
        );

        await createProduct(
          data
        );

        alert(
          "Product added successfully"
        );

        // RESET
        setFormData({

          title: "",

          description: "",

          category: "",

          price: "",

          quantity: "",
        });

        setImage(null);

      } catch (error) {

        console.log(error);

        alert(
          "Product upload failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="space-y-5"
    >

      {/* TITLE */}
      <div>

        <label className="block mb-2 text-gray-700 font-semibold">
          Product Title
        </label>

        <input
          type="text"
          name="title"
          value={
            formData.title
          }
          onChange={
            handleChange
          }
          className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-green-500"
          placeholder="Enter title"
          required
        />

      </div>

      {/* DESCRIPTION */}
      <div>

        <label className="block mb-2 text-gray-700 font-semibold">
          Description
        </label>

        <textarea
          name="description"
          rows={4}
          value={
            formData.description
          }
          onChange={
            handleChange
          }
          className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-green-500"
          placeholder="Enter description"
          required
        />

      </div>

      {/* CATEGORY */}
      <div>

        <label className="block mb-2 text-gray-700 font-semibold">
          Category
        </label>

        <select
          name="category"
          value={
            formData.category
          }
          onChange={
            handleChange
          }
          className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-green-500"
          required
        >

          <option value="">
            Select Category
          </option>

          <option value="Vegetables">
            Vegetables
          </option>

          <option value="Fruits">
            Fruits
          </option>

          <option value="Dairy">
            Dairy
          </option>

          <option value="Snacks">
            Snacks
          </option>

          <option value="Beverages">
            Beverages
          </option>

          <option value="Bakery">
            Bakery
          </option>

        </select>

      </div>

      {/* PRICE */}
      <div>

        <label className="block mb-2 text-gray-700 font-semibold">
          Price
        </label>

        <input
          type="number"
          name="price"
          value={
            formData.price
          }
          onChange={
            handleChange
          }
          className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-green-500"
          placeholder="Enter price"
          required
        />

      </div>

      {/* QUANTITY */}
      <div>

        <label className="block mb-2 text-gray-700 font-semibold">
          Quantity
        </label>

        <input
          type="number"
          name="quantity"
          value={
            formData.quantity
          }
          onChange={
            handleChange
          }
          className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-green-500"
          placeholder="Enter quantity"
          required
        />

      </div>

      {/* IMAGE */}
      <div>

        <label className="block mb-2 text-gray-700 font-semibold">
          Product Image
        </label>

        <input
          type="file"
          onChange={
            handleImageChange
          }
          className="w-full border rounded-2xl px-5 py-4"
          required
        />

      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 transition text-white py-4 rounded-2xl font-semibold"
      >

        {loading
          ? "Uploading..."
          : "Add Product"}

      </button>

    </form>
  );
}

export default AddProduct;