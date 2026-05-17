import { Link } from "react-router-dom";

function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-6 bg-white shadow-md">

        <h1 className="text-3xl font-bold text-green-600">
          Musalamma Grocery
        </h1>

        <div className="flex gap-4">

          <Link to="/login">

            <button className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition px-5 py-2 rounded-xl">
              Login
            </button>

          </Link>

          <Link to="/register">

            <button className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-xl">
              Register
            </button>

          </Link>

        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">

            Fresh Groceries
            <span className="text-green-600">
              {" "}
              Delivered
            </span>
            {" "}
            To Your Doorstep

          </h1>

          <p className="text-gray-600 text-lg mt-8 leading-relaxed">

            Shop fresh vegetables, fruits, snacks,
            beverages, dairy products, and more
            from Musalamma Grocery Shop.

          </p>

          <div className="mt-10 flex gap-5">

            <Link to="/register">

              <button className="bg-green-600 hover:bg-green-700 transition text-white px-8 py-4 rounded-2xl text-lg font-semibold">
                Start Shopping
              </button>

            </Link>

            <Link to="/login">

              <button className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition px-8 py-4 rounded-2xl text-lg font-semibold">
                Login
              </button>

            </Link>

          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center">

          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e"
            alt="Groceries"
            className="rounded-3xl shadow-2xl w-full max-w-2xl"
          />

        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pb-20">

        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="bg-white p-8 rounded-3xl shadow-md text-center">

            <div className="text-5xl mb-5">
              🥬
            </div>

            <h3 className="text-2xl font-bold text-gray-800">
              Fresh Products
            </h3>

            <p className="text-gray-500 mt-4">
              Fresh vegetables and fruits directly
              from trusted farms.
            </p>

          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md text-center">

            <div className="text-5xl mb-5">
              🚚
            </div>

            <h3 className="text-2xl font-bold text-gray-800">
              Fast Delivery
            </h3>

            <p className="text-gray-500 mt-4">
              Quick and reliable grocery delivery
              to your doorstep.
            </p>

          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md text-center">

            <div className="text-5xl mb-5">
              💰
            </div>

            <h3 className="text-2xl font-bold text-gray-800">
              Affordable Prices
            </h3>

            <p className="text-gray-500 mt-4">
              Best quality groceries at affordable
              and competitive prices.
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;