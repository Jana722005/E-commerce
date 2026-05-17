import { useEffect, useState } from "react";

import {
  getWishlist,
  removeFromWishlist,
} from "../services/authService";

function Wishlist() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [wishlist, setWishlist] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchWishlist =
      async () => {

        try {

          const data =
            await getWishlist(
              user._id || user.id
            );

          setWishlist(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchWishlist();

  }, []);

  const handleRemove =
    async (productId) => {

      try {

        await removeFromWishlist(
          user._id || user.id,
          productId
        );

        setWishlist((prev) =>
          prev.filter(
            (item) =>
              item._id !== productId
          )
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-800 mb-10">
          My Wishlist
        </h1>

        {loading ? (

          <div className="text-2xl text-gray-500">
            Loading...
          </div>

        ) : wishlist.length === 0 ? (

          <div className="bg-white p-10 rounded-3xl shadow-md text-center text-gray-500 text-2xl">
            No wishlist products
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {wishlist.map((product) => (

              <div
                key={product._id}
                className="bg-white rounded-3xl shadow-md overflow-hidden"
              >

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">

                  <h2 className="text-2xl font-bold text-gray-800">
                    {product.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {product.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">

                    <div className="text-2xl font-bold text-green-600">
                      ₹{product.price}
                    </div>

                    <div className="text-yellow-500">
                      ⭐ {product.rating}
                    </div>

                  </div>

                  <button
                    onClick={() =>
                      handleRemove(
                        product._id
                      )
                    }
                    className="w-full mt-6 bg-red-500 hover:bg-red-600 transition text-white py-3 rounded-xl font-semibold"
                  >
                    Remove
                  </button>

                </div>
              </div>

            ))}

          </div>

        )}
      </div>
    </div>
  );
}

export default Wishlist;