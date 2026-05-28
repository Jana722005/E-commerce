import { useState, useEffect } from "react";
import { FaTimes, FaStar, FaBoxOpen, FaTags, FaCommentAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ReviewForm from "./ReviewForm";
import API from "../services/api";

function ProductDetailsModal({ product: initialProduct, onClose, refreshProducts }) {
  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(false);

  const fetchUpdatedProduct = async () => {
    try {
      setLoading(true);
      // Fetch all products and find the matching one to get live reviews
      const { data } = await API.get("/products");
      const updated = data.find((p) => p._id === product._id);
      if (updated) {
        setProduct(updated);
      }
    } catch (error) {
      console.error("Failed to refresh product reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sync with initial product updates if any
  useEffect(() => {
    setProduct(initialProduct);
  }, [initialProduct]);

  const handleReviewAdded = () => {
    fetchUpdatedProduct();
    if (refreshProducts) {
      refreshProducts();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 md:p-8 z-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white/95 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative my-8"
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 bg-gray-100 hover:bg-red-500 hover:text-white transition p-3 rounded-full text-gray-600 z-10"
          >
            <FaTimes className="text-xl" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT COLUMN: HERO IMAGE */}
            <div className="relative h-72 lg:h-[600px] bg-gray-50 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="bg-green-600 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  {product.category}
                </span>
                <h2 className="text-3xl font-extrabold mt-2 leading-tight">
                  {product.title}
                </h2>
              </div>
            </div>

            {/* RIGHT COLUMN: DETAILS & REVIEWS */}
            <div className="p-6 md:p-10 flex flex-col justify-between max-h-[600px] overflow-y-auto">
              <div className="space-y-6">
                {/* HEAD DETAILS */}
                <div className="flex items-center justify-between flex-wrap gap-4 border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-400">Price Per Unit</p>
                    <span className="text-3xl font-black text-green-600">
                      ₹{product.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-xl font-bold">
                      <FaStar /> {product.rating?.toFixed(1) || 0}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ({product.reviews?.length || 0} customer reviews)
                    </span>
                  </div>
                </div>

                {/* INFO PILLS */}
                <div className="flex flex-wrap gap-3">
                  <span className="flex items-center gap-2 bg-gray-50 border px-4 py-2 rounded-2xl text-sm font-semibold text-gray-700">
                    <FaBoxOpen className="text-green-600" /> Stock Status:{" "}
                    {product.quantity > 0 ? (
                      <span className="text-green-600 font-bold">
                        {product.quantity} Available
                      </span>
                    ) : (
                      <span className="text-red-500 font-bold">Out of Stock</span>
                    )}
                  </span>
                  <span className="flex items-center gap-2 bg-gray-50 border px-4 py-2 rounded-2xl text-sm font-semibold text-gray-700">
                    <FaTags className="text-green-600" /> Category: {product.category}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-800">
                    Product Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {product.description ||
                      "Fresh and organic product, picked and curated with optimal safety standards to bring the highest quality straight to your kitchen."}
                  </p>
                </div>

                {/* REVIEWS SECTION */}
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <FaCommentAlt className="text-green-600" /> Reviews & Ratings
                  </h3>

                  {loading && product.reviews?.length === 0 ? (
                    <p className="text-sm text-gray-500">Loading reviews...</p>
                  ) : !product.reviews || product.reviews.length === 0 ? (
                    <div className="bg-gray-50 rounded-2xl p-6 text-center text-gray-500 text-sm">
                      No customer reviews yet. Be the first to share your thoughts!
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                      {product.reviews.map((rev) => (
                        <div
                          key={rev._id}
                          className="bg-gray-50 border rounded-2xl p-4 space-y-2 shadow-sm"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-extrabold text-sm text-gray-800">
                              {rev.name || "Verified Customer"}
                            </span>
                            <span className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                              {Array.from({ length: Math.round(rev.rating) }).map(
                                (_, idx) => (
                                  <FaStar key={idx} />
                                )
                              )}
                              ({rev.rating} / 5)
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {rev.comment}
                          </p>
                          <p className="text-right text-[10px] text-gray-400">
                            {new Date(rev.createdAt || Date.now()).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ADD REVIEW PANE */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-gray-800">
                    Write a Review
                  </h3>
                  <ReviewForm
                    productId={product._id}
                    refreshProducts={handleReviewAdded}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default ProductDetailsModal;
