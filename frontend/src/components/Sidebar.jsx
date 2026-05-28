import {
  FaShoppingBasket,
  FaHeart,
  FaBox,
  FaFilter,
  FaTags,
  FaTimes,
} from "react-icons/fa";

function Sidebar({
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  isOpen,
  onClose,
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
    <>
      {/* BACKDROP OVERLAY */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* DRAWER CONTAINER */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl p-6 border-r flex flex-col justify-between transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div>
          {/* HEADER WITH CLOSE BUTTON */}
          <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🥬</span>
              <h2 className="text-2xl font-black text-green-700 tracking-tight">
                Store Menu
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition-all text-gray-400 hover:text-gray-600 border border-gray-100"
              title="Close menu"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          {/* MAIN NAVIGATION LINKS */}
          <div className="space-y-2.5">
            <a
              href="/basket"
              className="flex items-center gap-4 bg-gray-50 hover:bg-green-50 transition-colors duration-200 p-3.5 rounded-xl text-gray-700 hover:text-green-600 border border-gray-100/50"
            >
              <FaShoppingBasket className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-sm">
                View Basket
              </span>
            </a>

            <a
              href="/wishlist"
              className="flex items-center gap-4 bg-gray-50 hover:bg-red-50 transition-colors duration-200 p-3.5 rounded-xl text-gray-700 hover:text-red-500 border border-gray-100/50"
            >
              <FaHeart className="w-4 h-4 text-red-500" />
              <span className="font-semibold text-sm">
                My Wishlist
              </span>
            </a>

            <a
              href="/orders"
              className="flex items-center gap-4 bg-gray-50 hover:bg-blue-50 transition-colors duration-200 p-3.5 rounded-xl text-gray-700 hover:text-blue-500 border border-gray-100/50"
            >
              <FaBox className="w-4 h-4 text-blue-500" />
              <span className="font-semibold text-sm">
                Order History
              </span>
            </a>
          </div>

          {/* CATEGORIES SECTION */}
          <div className="mt-8">
            <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-gray-50">
              <FaTags className="text-green-600 w-4 h-4" />
              <h3 className="text-base font-bold text-gray-800 tracking-tight">
                Categories
              </h3>
            </div>

            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    onClose(); // Auto close on selection for pristine UX
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border
                    ${
                      selectedCategory === category
                        ? "bg-green-600 text-white border-green-600 shadow-sm"
                        : "bg-gray-50 hover:bg-green-50/50 text-gray-600 hover:text-green-700 border-gray-100/50"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PRICE FILTER SECTION (Pushed to bottom) */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-2.5 mb-4">
            <FaFilter className="text-green-600 w-4 h-4" />
            <h3 className="text-base font-bold text-gray-800 tracking-tight">
              Price Filter
            </h3>
          </div>

          <div className="bg-gray-50/80 p-4.5 rounded-2xl border border-gray-100/50">
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />

            <div className="mt-3.5 text-center text-base font-extrabold text-green-700 bg-white py-2 rounded-xl shadow-sm border border-gray-100/50">
              ₹0 - ₹{maxPrice}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Sidebar;