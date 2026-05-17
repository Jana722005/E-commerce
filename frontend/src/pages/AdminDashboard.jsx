import {
  useEffect,
  useState,
} from "react";

import AdminSidebar from "../components/admin/AdminSidebar";

import AdminStats from "../components/admin/AdminStats";

import AddProduct from "../components/admin/AddProduct";

import ManageOrders from "../components/admin/ManageOrders";

import ManageProducts from "../components/admin/ManageProducts";

import {
  getProducts,
} from "../services/productService";

import {
  getAllOrders,
} from "../services/orderService";

function AdminDashboard() {

  const [activeSection,
    setActiveSection] =
    useState("dashboard");

  const [sidebarOpen,
    setSidebarOpen] =
    useState(false);

  const [products,
    setProducts] =
    useState([]);

  const [orders,
    setOrders] =
    useState([]);

  // FETCH DATA
  useEffect(() => {

    const fetchData =
      async () => {

        try {

          const productsData =
            await getProducts();

          const ordersData =
            await getAllOrders();

          setProducts(
            productsData
          );

          setOrders(
            ordersData
          );

        } catch (error) {

          console.log(error);
        }
      };

    fetchData();

    const interval =
      setInterval(
        fetchData,
        5000
      );

    return () =>
      clearInterval(
        interval
      );

  }, []);

  // REVENUE
  const revenue =
    orders.reduce(
      (
        total,
        order
      ) =>
        total +
        order.totalPrice,
      0
    );

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <AdminSidebar
        activeSection={
          activeSection
        }
        setActiveSection={
          setActiveSection
        }
        sidebarOpen={
          sidebarOpen
        }
        setSidebarOpen={
          setSidebarOpen
        }
      />

      {/* MAIN */}
      <div className="flex-1 p-4 md:p-8 overflow-hidden">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage products and customer orders
          </p>

        </div>

        {/* STATS */}
        <AdminStats
          totalProducts={
            products.length
          }
          totalOrders={
            orders.length
          }
          revenue={revenue}
        />

        {/* DASHBOARD */}
        {activeSection ===
          "dashboard" && (

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">

            {/* ADD PRODUCT */}
            <div className="xl:col-span-1">

              <div className="bg-white rounded-3xl shadow-md p-6">

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Quick Add Product
                </h2>

                <AddProduct />

              </div>

            </div>

            {/* ORDERS */}
            <div className="xl:col-span-2">

              <div className="bg-white rounded-3xl shadow-md p-6">

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Recent Orders
                </h2>

                <ManageOrders />

              </div>

            </div>

          </div>

        )}

        {/* ADD PRODUCT */}
        {activeSection ===
          "add-product" && (

          <div className="bg-white rounded-3xl shadow-md p-6 mt-10">

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Add Product
            </h2>

            <AddProduct />

          </div>

        )}

        {/* PRODUCTS */}
        {activeSection ===
          "products" && (

          <div className="bg-white rounded-3xl shadow-md p-6 mt-10">

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Product Management
            </h2>

            <ManageProducts />

          </div>

        )}

        {/* ORDERS */}
        {activeSection ===
          "orders" && (

          <div className="bg-white rounded-3xl shadow-md p-6 mt-10">

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Order Management
            </h2>

            <ManageOrders />

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminDashboard;