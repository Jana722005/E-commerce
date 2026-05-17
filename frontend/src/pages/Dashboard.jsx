import { useState } from "react";

import DashboardNavbar from "../components/DashboardNavbar";

import Sidebar from "../components/Sidebar";

import ProductGrid from "../components/ProductGrid";

function Dashboard() {

  const [searchTerm,
    setSearchTerm] =
    useState("");

  const [selectedCategory,
    setSelectedCategory] =
    useState("All");

  const [maxPrice,
    setMaxPrice] =
    useState(5000);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <DashboardNavbar
        searchTerm={searchTerm}
        setSearchTerm={
          setSearchTerm
        }
      />

      {/* CONTENT */}
      <div className="flex flex-col md:flex-row">

        {/* SIDEBAR */}
        <Sidebar
          selectedCategory={
            selectedCategory
          }
          setSelectedCategory={
            setSelectedCategory
          }
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        {/* PRODUCTS */}
        <div className="flex-1">

          <ProductGrid
            searchTerm={searchTerm}
            selectedCategory={
              selectedCategory
            }
            maxPrice={maxPrice}
          />

        </div>

      </div>
    </div>
  );
}

export default Dashboard;