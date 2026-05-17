import { FaLeaf, FaTruck, FaWallet, FaClock } from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaLeaf />,
      title: "Fresh Products",
      description: "Quality fresh groceries directly from farms.",
    },
    {
      icon: <FaTruck />,
      title: "Fast Delivery",
      description: "Quick and safe delivery to your location.",
    },
    {
      icon: <FaWallet />,
      title: "Affordable Prices",
      description: "Best grocery prices with exciting offers.",
    },
    {
      icon: <FaClock />,
      title: "24/7 Service",
      description: "Shop anytime with our online grocery store.",
    },
  ];

  return (
    <div className="px-8 md:px-20 py-20 bg-white">
      
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
        Why Choose Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-green-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <div className="text-4xl text-green-600 mb-4">
              {feature.icon}
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              {feature.title}
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;