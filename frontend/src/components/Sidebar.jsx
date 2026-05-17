import {
  FaShoppingBasket,
  FaHeart,
  FaBox,
  FaFilter,
  FaTags,
} from "react-icons/fa";

function Sidebar({
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
}) {

  const categories = [
    "All",
    "Vegetables",
    "Fruits",
    "Dairy",
    "Snacks",
    "Beverages",
    "Bakery",
  ];

  return (
    <div className="w-full md:w-72 bg-white shadow-lg md:min-h-screen p-6 border-r">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-green-600 mb-10">
        Dashboard
      </h2>

      {/* MENU */}
      <div className="space-y-3">

        <a
          href="/basket"
          className="flex items-center gap-4 bg-gray-50 hover:bg-green-50 transition p-4 rounded-2xl text-gray-700 hover:text-green-600"
        >
          <FaShoppingBasket />
          <span className="font-medium">
            Basket
          </span>
        </a>

        <a
          href="/wishlist"
          className="flex items-center gap-4 bg-gray-50 hover:bg-red-50 transition p-4 rounded-2xl text-gray-700 hover:text-red-500"
        >
          <FaHeart />
          <span className="font-medium">
            Wishlist
          </span>
        </a>

        <a
          href="/orders"
          className="flex items-center gap-4 bg-gray-50 hover:bg-blue-50 transition p-4 rounded-2xl text-gray-700 hover:text-blue-500"
        >
          <FaBox />
          <span className="font-medium">
            Orders
          </span>
        </a>

      </div>

      {/* CATEGORY */}
      <div className="mt-10">

        <div className="flex items-center gap-3 mb-5">

          <FaTags className="text-green-600" />

          <h3 className="text-xl font-bold text-gray-800">
            Categories
          </h3>

        </div>

        <div className="space-y-3">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() =>
                setSelectedCategory(
                  category
                )
              }
              className={`w-full text-left px-4 py-3 rounded-xl transition

                ${
                  selectedCategory ===
                  category
                    ? "bg-green-600 text-white"
                    : "bg-gray-50 hover:bg-green-50 text-gray-700"
                }
              `}
            >
              {category}
            </button>

          ))}

        </div>

      </div>

      {/* FILTER */}
      <div className="mt-10">

        <div className="flex items-center gap-3 mb-5">

          <FaFilter className="text-green-600" />

          <h3 className="text-xl font-bold text-gray-800">
            Price Filter
          </h3>

        </div>

        <div className="bg-gray-50 p-5 rounded-2xl">

          <input
            type="range"
            min="0"
            max="5000"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full"
          />

          <div className="mt-4 text-center text-lg font-bold text-green-600">

            ₹0 - ₹{maxPrice}

          </div>

        </div>

      </div>
    </div>
  );
}

export default Sidebar;