import {
  FaBoxOpen,
  FaShoppingCart,
  FaChartBar,
  FaSignOutAlt,
  FaBars,
  FaPlus,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function AdminSidebar({
  activeSection,
  setActiveSection,
  sidebarOpen,
  setSidebarOpen,
}) {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <>
      {/* MOBILE MENU */}
      <button
        onClick={() =>
          setSidebarOpen(!sidebarOpen)
        }
        className="md:hidden fixed top-5 left-5 z-50 bg-green-600 text-white p-3 rounded-xl"
      >
        <FaBars />
      </button>

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:static top-0 left-0 z-40
          h-screen w-72 bg-gray-900 text-white
          p-6 flex flex-col transition-transform duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        {/* LOGO */}
        <div className="mb-12 mt-10 md:mt-0">

          <h1 className="text-3xl font-bold text-green-400">
            Musalamma Admin
          </h1>

          <p className="text-gray-400 mt-2">
            Grocery Management
          </p>

        </div>

        {/* MENU */}
        <div className="space-y-4 flex-1">

          {/* DASHBOARD */}
          <button
            onClick={() =>
              setActiveSection(
                "dashboard"
              )
            }
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition

              ${
                activeSection ===
                "dashboard"
                  ? "bg-green-600"
                  : "hover:bg-gray-800"
              }
            `}
          >

            <FaChartBar />

            Dashboard

          </button>

          {/* ADD PRODUCT */}
          <button
            onClick={() =>
              setActiveSection(
                "add-product"
              )
            }
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition

              ${
                activeSection ===
                "add-product"
                  ? "bg-green-600"
                  : "hover:bg-gray-800"
              }
            `}
          >

            <FaPlus />

            Add Product

          </button>

          {/* PRODUCTS */}
          <button
            onClick={() =>
              setActiveSection(
                "products"
              )
            }
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition

              ${
                activeSection ===
                "products"
                  ? "bg-green-600"
                  : "hover:bg-gray-800"
              }
            `}
          >

            <FaBoxOpen />

            Products

          </button>

          {/* ORDERS */}
          <button
            onClick={() =>
              setActiveSection(
                "orders"
              )
            }
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition

              ${
                activeSection ===
                "orders"
                  ? "bg-green-600"
                  : "hover:bg-gray-800"
              }
            `}
          >

            <FaShoppingCart />

            Orders

          </button>

        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 transition p-4 rounded-2xl"
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>
    </>
  );
}

export default AdminSidebar;