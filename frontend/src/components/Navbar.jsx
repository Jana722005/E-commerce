import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      
      <div className="text-2xl font-bold text-green-600">
        Musalamma Grocery
      </div>

      <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
        <li className="hover:text-green-600 cursor-pointer">Home</li>
        <li className="hover:text-green-600 cursor-pointer">Products</li>
        <li className="hover:text-green-600 cursor-pointer">About</li>
        <li className="hover:text-green-600 cursor-pointer">Contact</li>
      </ul>

      <div className="flex gap-4">
        <Link to="/login">
          <button className="px-5 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;