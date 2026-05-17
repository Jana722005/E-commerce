import {
  useEffect,
  useState,
} from "react";

import {
  FaTrash,
  FaEdit,
  FaSave,
} from "react-icons/fa";

import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../../services/productService";

function ManageProducts() {

  const [products,
    setProducts] =
    useState([]);

  const [editingProduct,
    setEditingProduct] =
    useState(null);

  const [formData,
    setFormData] =
    useState({

      title: "",

      price: "",

      quantity: "",

      category: "",
    });

  const [loading,
    setLoading] =
    useState(true);

  // LOAD PRODUCTS
  useEffect(() => {

    const loadProducts =
      async () => {

        try {

          const data =
            await getProducts();

          setProducts(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    loadProducts();

  }, []);

  // DELETE PRODUCT
  const handleDelete =
    async (id) => {

      try {

        await deleteProduct(id);

        alert(
          "Product deleted successfully"
        );

        // REFRESH PRODUCTS
        const data =
          await getProducts();

        setProducts(data);

      } catch (error) {

        console.log(error);

        alert(
          "Delete failed"
        );
      }
    };

  // EDIT PRODUCT
  const handleEdit = (
    product
  ) => {

    setEditingProduct(
      product._id
    );

    setFormData({

      title:
        product.title,

      price:
        product.price,

      quantity:
        product.quantity,

      category:
        product.category,
    });
  };

  // UPDATE PRODUCT
  const handleUpdate =
    async (id) => {

      try {

        await updateProduct(
          id,
          formData
        );

        alert(
          "Product updated successfully"
        );

        setEditingProduct(
          null
        );

        // REFRESH PRODUCTS
        const data =
          await getProducts();

        setProducts(data);

      } catch (error) {

        console.log(error);

        alert(
          "Update failed"
        );
      }
    };

  // LOADING
  if (loading) {

    return (
      <div className="text-center py-20 text-2xl text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {products.length === 0 ? (

        <div className="bg-gray-50 rounded-3xl p-10 text-center text-gray-500 text-2xl">

          No products available

        </div>

      ) : (

        products.map(
          (product) => (

            <div
              key={product._id}
              className="bg-gray-50 rounded-3xl p-5 flex flex-col xl:flex-row gap-6"
            >

              {/* IMAGE */}
              <div className="xl:w-52">

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-52 object-cover rounded-2xl"
                />

              </div>

              {/* CONTENT */}
              <div className="flex-1">

                {editingProduct ===
                product._id ? (

                  <div className="space-y-4">

                    {/* TITLE */}
                    <div>

                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Product Title
                      </label>

                      <input
                        type="text"
                        value={
                          formData.title
                        }
                        onChange={(e) =>
                          setFormData({

                            ...formData,

                            title:
                              e.target.value,
                          })
                        }
                        className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-green-500"
                      />

                    </div>

                    {/* PRICE */}
                    <div>

                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Price
                      </label>

                      <input
                        type="number"
                        value={
                          formData.price
                        }
                        onChange={(e) =>
                          setFormData({

                            ...formData,

                            price:
                              e.target.value,
                          })
                        }
                        className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-green-500"
                      />

                    </div>

                    {/* QUANTITY */}
                    <div>

                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Quantity
                      </label>

                      <input
                        type="number"
                        value={
                          formData.quantity
                        }
                        onChange={(e) =>
                          setFormData({

                            ...formData,

                            quantity:
                              e.target.value,
                          })
                        }
                        className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-green-500"
                      />

                    </div>

                    {/* CATEGORY */}
                    <div>

                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Category
                      </label>

                      <input
                        type="text"
                        value={
                          formData.category
                        }
                        onChange={(e) =>
                          setFormData({

                            ...formData,

                            category:
                              e.target.value,
                          })
                        }
                        className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-green-500"
                      />

                    </div>

                    {/* SAVE BUTTON */}
                    <button
                      onClick={() =>
                        handleUpdate(
                          product._id
                        )
                      }
                      className="flex items-center gap-3 bg-green-600 hover:bg-green-700 transition text-white px-6 py-4 rounded-2xl font-semibold"
                    >

                      <FaSave />

                      Save Changes

                    </button>

                  </div>

                ) : (

                  <>
                    {/* TITLE */}
                    <h2 className="text-3xl font-bold text-gray-800">
                      {product.title}
                    </h2>

                    {/* CATEGORY */}
                    <p className="text-gray-500 mt-3 text-lg">
                      {
                        product.category
                      }
                    </p>

                    {/* DETAILS */}
                    <div className="flex flex-wrap gap-8 mt-6">

                      <div>

                        <p className="text-gray-500">
                          Price
                        </p>

                        <h3 className="text-3xl font-bold text-green-600 mt-2">

                          ₹
                          {
                            product.price
                          }

                        </h3>

                      </div>

                      <div>

                        <p className="text-gray-500">
                          Quantity
                        </p>

                        <h3 className="text-3xl font-bold text-gray-800 mt-2">

                          {
                            product.quantity
                          }

                        </h3>

                      </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-4 mt-8">

                      {/* EDIT */}
                      <button
                        onClick={() =>
                          handleEdit(
                            product
                          )
                        }
                        className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-4 rounded-2xl font-semibold"
                      >

                        <FaEdit />

                        Edit

                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDelete(
                            product._id
                          )
                        }
                        className="flex items-center gap-3 bg-red-500 hover:bg-red-600 transition text-white px-6 py-4 rounded-2xl font-semibold"
                      >

                        <FaTrash />

                        Delete

                      </button>

                    </div>

                  </>
                )}

              </div>

            </div>

          )
        )

      )}

    </div>
  );
}

export default ManageProducts;