import {
  useState,
  useEffect,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaBell,
  FaShoppingBasket,
  FaUserCircle,
  FaSignOutAlt,
  FaHeart,
  FaClipboardList,
} from "react-icons/fa";

import { useSelector } from "react-redux";

import NotificationDropdown from "./NotificationDropdown";

import {
  getNotifications,
} from "../services/notificationService";

function DashboardNavbar({
  searchTerm,
  setSearchTerm,
}) {

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const [showNotifications,
    setShowNotifications] =
    useState(false);

  const [notifications,
    setNotifications] =
    useState([]);

  const [unreadCount,
    setUnreadCount] =
    useState(0);

  // FIXED CART STATE
  const cartItems =
  useSelector(
    (state) =>
      state.cart?.cartItems || []
  );

  // FIXED WISHLIST STATE
  const wishlistItems =
  useSelector(
    (state) =>
      state.wishlist?.wishlistItems || []
  );

  // TOTAL CART ITEMS
  const totalItems =
    cartItems.reduce(

      (
        total,
        item
      ) =>

        total +
        item.quantity,

      0
    );

  // FETCH NOTIFICATIONS
  useEffect(() => {

    const fetchNotifications =
      async () => {

        try {

          const data =
            await getNotifications(

              user?.id ||
              user?._id
            );

          setNotifications(
            data
          );

          // UNREAD COUNT
          const unread =
            data.filter(
              (notification) =>
                !notification.isRead
            ).length;

          setUnreadCount(
            unread
          );

        } catch (error) {

          console.log(error);
        }
      };

    fetchNotifications();

    // AUTO REFRESH
    const interval =
      setInterval(

        fetchNotifications,

        5000
      );

    return () =>
      clearInterval(
        interval
      );

  }, []);

  // LOGOUT
  const handleLogout =
    () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      navigate("/login");
    };

  return (
    <nav className="bg-white border-b px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50">

      {/* LEFT */}
      <Link to="/dashboard">

        <div className="flex items-center gap-4 cursor-pointer">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
            alt="Shop"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div className="hidden sm:block">

            <h1 className="text-2xl font-bold text-green-600">

              Musalamma Grocery

            </h1>

            <p className="text-sm text-gray-500">

              Fresh Grocery Delivery

            </p>

          </div>

        </div>

      </Link>

      {/* SEARCH */}
      <div className="hidden md:flex w-[40%]">

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="w-full px-5 py-3 rounded-l-xl border border-gray-300 outline-none focus:border-green-500"
        />

        <button className="bg-green-600 hover:bg-green-700 transition text-white px-6 rounded-r-xl">

          Search

        </button>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 md:gap-6 text-xl text-gray-700">

        {/* NOTIFICATIONS */}
        <div className="relative">

          <button
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            className="relative hover:text-green-600 transition"
          >

            <FaBell />

            {/* UNREAD COUNT */}
            {unreadCount > 0 && (

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">

                {unreadCount}

              </span>

            )}

          </button>

          {/* DROPDOWN */}
          {showNotifications && (

            <NotificationDropdown
              notifications={
                notifications
              }
            />

          )}

        </div>

        {/* WISHLIST */}
        <Link to="/wishlist">

          <button className="relative hover:text-red-500 transition">

            <FaHeart />

            {/* WISHLIST COUNT */}
            {wishlistItems.length >
              0 && (

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">

                {
                  wishlistItems.length
                }

              </span>

            )}

          </button>

        </Link>

        {/* BASKET */}
        <Link to="/basket">

          <button className="relative hover:text-green-600 transition">

            <FaShoppingBasket />

            {/* CART COUNT */}
            {totalItems > 0 && (

              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">

                {totalItems}

              </span>

            )}

          </button>

        </Link>

        {/* ORDERS */}
        <Link to="/orders">

          <button className="hover:text-blue-600 transition">

            <FaClipboardList />

          </button>

        </Link>

        {/* PROFILE */}
        <Link to="/profile">

          <button className="hover:text-green-600 transition">

            {user?.profileImage ? (

              <img
                src={
                  user.profileImage
                }
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
              />

            ) : (

              <FaUserCircle />
            )}

          </button>

        </Link>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="hover:text-red-500 transition"
        >

          <FaSignOutAlt />

        </button>

      </div>

    </nav>
  );
}

export default DashboardNavbar;