import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";


import {
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";

import { addToCart } from "../redux/slices/cartSlice";

import { addToWishlist } from "../services/authService";

function ProductCard({ product, onViewDetails }) {

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
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between h-full group">

      {/* IMAGE CONTAINER */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-50 border-b border-gray-100">

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-700 ease-out"
          onClick={onViewDetails}
        />

        {/* WISHLIST BUTTON */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 bg-white/70 backdrop-blur-md p-2.5 rounded-full shadow-sm hover:scale-110 active:scale-95 transition-all duration-200 text-red-500 border border-white/20 hover:bg-white"
        >
          <FaHeart className="w-4 h-4" />
        </button>

      </div>

      {/* CONTENT AREA */}
      <div className="p-5 flex flex-col flex-grow justify-between">

        <div>
          {/* CATEGORY & STOCK STATUS */}
          <div className="flex items-center justify-between mb-3">
            <span className="bg-green-50 text-green-700 text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-md border border-green-100/50">
              {product.category}
            </span>
            {product.quantity > 5 ? (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/30">
                In Stock
              </span>
            ) : product.quantity > 0 ? (
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100/30">
                Only {product.quantity} left
              </span>
            ) : (
              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-100/30">
                Out of Stock
              </span>
            )}
          </div>

          {/* TITLE */}
          <h3
            className="text-base font-bold text-gray-800 line-clamp-1 cursor-pointer hover:text-green-600 transition-colors duration-200 tracking-tight"
            onClick={onViewDetails}
            title={product.title}
          >
            {product.title}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-gray-500 mt-1.5 text-xs line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* RATING & REVIEWS */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center text-amber-500 font-bold bg-amber-50/50 px-2 py-0.5 rounded border border-amber-100/20 text-xs gap-1">
              <span>★</span>
              <span>{product.rating?.toFixed(1) || 0}</span>
            </div>
            <span className="text-gray-300 text-xs">•</span>
            <span className="text-gray-400 text-[11px] font-semibold">
              {product.numReviews || 0} Reviews
            </span>
          </div>
        </div>

        {/* PRICE & ACTIONS */}
        <div className="mt-5">
          <div className="flex items-baseline justify-between border-t border-gray-100/70 pt-4">
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
              Price
            </span>
            <span className="text-xl font-extrabold text-green-700">
              ₹{product.price}
            </span>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-3.5 flex gap-2">

            {/* BUY NOW */}
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-green-600 hover:bg-green-700 active:scale-95 transition-all text-white py-2.5 rounded-xl text-xs font-bold tracking-wide"
            >
              Buy Now
            </button>

            {/* CART */}
            <button
              onClick={handleAddToCart}
              className="bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-xl active:scale-95 transition-all border border-green-100/50"
              title="Add to Basket"
            >
              <FaShoppingCart className="w-4 h-4" />
            </button>

          </div>
        </div>

      </div>
    </div>

    
  );
}

export default ProductCard;