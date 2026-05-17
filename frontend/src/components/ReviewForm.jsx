import { useState } from "react";

import { addReview } from "../services/productService";

function ReviewForm({
  productId,
  refreshProducts,
}) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const reviewData = {

        userId:
          user._id || user.id,

        name: user.name,

        rating,

        comment,
      };

      const data = await addReview(
        productId,
        reviewData
      );

      alert(data.message);

      setComment("");

      setRating(5);

      refreshProducts();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Review failed"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4"
    >

      {/* Rating */}
      <div>

        <label className="block mb-2 font-semibold text-gray-700">
          Rating
        </label>

        <select
          value={rating}
          onChange={(e) =>
            setRating(e.target.value)
          }
          className="w-full border rounded-xl px-4 py-3 outline-none"
        >
          <option value="5">
            5 Stars
          </option>

          <option value="4">
            4 Stars
          </option>

          <option value="3">
            3 Stars
          </option>

          <option value="2">
            2 Stars
          </option>

          <option value="1">
            1 Star
          </option>

        </select>
      </div>

      {/* Comment */}
      <div>

        <label className="block mb-2 font-semibold text-gray-700">
          Comment
        </label>

        <textarea
          rows={4}
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          className="w-full border rounded-xl px-4 py-3 outline-none"
          placeholder="Write your review..."
          required
        />

      </div>

      {/* Button */}
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-xl font-semibold"
      >
        Submit Review
      </button>

    </form>
  );
}

export default ReviewForm;