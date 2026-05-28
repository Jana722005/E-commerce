import { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import Sidebar from "../components/Sidebar";
import ProductGrid from "../components/ProductGrid";
import { FaFilter } from "react-icons/fa";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      
      {/* NAVBAR */}
      <DashboardNavbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-green-800 to-green-950 text-white py-12 px-6 md:px-12 relative overflow-hidden shadow-sm">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 translate-x-1/4 scale-150">
          <span className="text-[250px]">🥬</span>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="bg-green-700/60 backdrop-blur-sm text-green-100 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-green-500/20">
            Musalamma Organic Market
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-3 tracking-tight font-serif">
            Fresh Farm Groceries
          </h1>
          <p className="text-green-200/90 text-sm md:text-base mt-2 max-w-xl font-medium">
            Handpicked, pesticide-free vegetables, fresh seasonal fruits, and premium kitchen essentials delivered right to your home.
          </p>
        </div>
      </div>

      {/* FILTER CONTROL BAR */}
      <div className="bg-white border-b border-gray-100 sticky top-[72px] z-30 shadow-sm py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2.5 bg-green-600 hover:bg-green-700 active:scale-95 transition-all text-white px-5 py-2.5 rounded-xl font-extrabold text-xs tracking-wider uppercase shadow-md shadow-green-600/10 hover:shadow-green-600/20"
          >
            <FaFilter className="w-3 h-3" />
            <span>Categories & Filters</span>
          </button>

          <div className="flex items-center gap-3 text-xs md:text-sm font-semibold text-gray-500">
            <span>Filter:</span>
            <span className="bg-green-50 text-green-700 font-bold px-3.5 py-1 rounded-full border border-green-100/50">
              {selectedCategory}
            </span>
            {maxPrice < 5000 && (
              <span className="bg-green-50 text-green-700 font-bold px-3.5 py-1 rounded-full border border-green-100/50">
                Under ₹{maxPrice}
              </span>
            )}
          </div>

        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        
        {/* SIDEBAR DRAWER (Sliding from left to right) */}
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* PRODUCT GRID SECTION */}
        <main className="w-full">
          <ProductGrid
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            maxPrice={maxPrice}
          />
        </main>

      </div>
      
    </div>
  );
}

export default Dashboard;