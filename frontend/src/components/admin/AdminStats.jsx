import {
  FaBox,
  FaShoppingBag,
  FaRupeeSign,
} from "react-icons/fa";

function AdminStats({
  totalProducts,
  totalOrders,
  revenue,
}) {

  const stats = [

    {
      title: "Products",
      value: totalProducts,
      icon: <FaBox />,
      color: "bg-blue-500",
    },

    {
      title: "Orders",
      value: totalOrders,
      icon: <FaShoppingBag />,
      color: "bg-green-500",
    },

    {
      title: "Revenue",
      value: `₹${revenue}`,
      icon: <FaRupeeSign />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

      {stats.map((stat, index) => (

        <div
          key={index}
          className="bg-white rounded-3xl shadow-md p-6 flex items-center justify-between"
        >

          <div>

            <p className="text-gray-500">
              {stat.title}
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {stat.value}
            </h2>

          </div>

          <div className={`${stat.color} text-white text-3xl p-5 rounded-2xl`}>

            {stat.icon}

          </div>

        </div>

      ))}

    </div>
  );
}

export default AdminStats;