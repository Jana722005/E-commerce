function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-8 md:px-20">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div>
          <h2 className="text-3xl font-bold text-green-500 mb-4">
            Musalamma Grocery
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Fresh groceries delivered with quality and care.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>

          <p className="text-gray-400">Tamil Nadu, India</p>
          <p className="text-gray-400">support@musalamma.com</p>
          <p className="text-gray-400">+91 9876543210</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
        © 2026 Musalamma Grocery Shop. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;