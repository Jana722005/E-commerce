import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="w-full min-h-[90vh] flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-16">
      
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex-1"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
          Fresh Groceries <br />
          Delivered To Your Door
        </h1>

        <p className="mt-6 text-gray-600 text-lg leading-relaxed">
          Buy fresh vegetables, fruits, snacks, dairy products and more
          from Musalamma Grocery Shop with quality assurance and fast delivery.
        </p>

        <div className="mt-8 flex gap-4">
          <Link to="/dashboard">
            <button className="px-8 py-4 bg-green-600 text-white rounded-xl text-lg hover:bg-green-700 transition shadow-lg">
              Start Shopping
            </button>
          </Link>

          <button className="px-8 py-4 border border-green-600 text-green-600 rounded-xl text-lg hover:bg-green-100 transition">
            Explore
          </button>
        </div>
      </motion.div>

      {/* Right Image */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex-1 flex justify-center mb-10 md:mb-0"
      >
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e"
          alt="Groceries"
          className="w-full max-w-xl rounded-3xl shadow-2xl"
        />
      </motion.div>
    </div>
  );
}

export default HeroSection;