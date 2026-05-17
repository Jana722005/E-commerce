import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";


import {
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";

import { addToCart } from "../redux/slices/cartSlice";

import { addToWishlist } from "../services/authService";

function ProductCard({ product }) {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // BUY NOW
  const handleBuyNow = () => {

    dispatch(addToCart(product));

    navigate("/basket");
  };

  // ADD TO CART
  const handleAddToCart = () => {

    dispatch(addToCart(product));

    alert("Added to basket");
  };

  // ADD TO WISHLIST
  const handleWishlist =
    async () => {

      try {

        const data =
          await addToWishlist(
            user._id || user.id,
            product._id
          );

        alert(data.message);

      } catch (error) {

        alert(
          error.response?.data
            ?.message ||
            "Wishlist failed"
        );
      }
    };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden border">

      {/* IMAGE */}
      <div className="relative">

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 md:h-44 object-cover"
        />

        {/* WISHLIST */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition text-red-500"
        >
          <FaHeart />
        </button>

      </div>

      {/* CONTENT */}
      <div className="p-4">

        {/* CATEGORY */}
        <div className="mb-2">

          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
            {product.category}
          </span>

        </div>

        {/* TITLE */}
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
          {product.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-gray-500 mt-2 text-sm line-clamp-2">
          {product.description}
        </p>

        {/* RATING */}
        <div className="flex items-center justify-between mt-4">

          <div className="text-yellow-500 text-sm font-semibold">
            ⭐ {product.rating?.toFixed(1) || 0}
          </div>

          <div className="text-gray-400 text-xs">
            {product.numReviews || 0} Reviews
          </div>

        </div>

        {/* PRICE + STOCK */}
        <div className="flex items-center justify-between mt-4">

          <span className="text-xl font-bold text-green-600">
            ₹{product.price}
          </span>

          <span className="text-sm text-gray-500">
            Stock: {product.quantity}
          </span>

        </div>

        {/* BUTTONS */}
        <div className="mt-4 flex gap-2">

          {/* BUY NOW */}
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-xl text-sm font-semibold"
          >
            Buy Now
          </button>

          {/* CART */}
          <button
            onClick={handleAddToCart}
            className="bg-gray-100 hover:bg-gray-200 p-3 rounded-xl transition"
          >
            <FaShoppingCart />
          </button>

        </div>

      </div>
    </div>
    
  );
}

export default ProductCard;