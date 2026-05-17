import { useEffect, useState } from "react";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/orderService";

function ManageOrders() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const data = await getAllOrders();

        setOrders(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchOrders();

  }, []);

  const handleStatusUpdate = async (
    orderId,
    status
  ) => {

    try {

      await updateOrderStatus(orderId, status);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status }
            : order
        )
      );

    } catch (error) {

      console.log(error);

      alert("Failed to update order");
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-md">

      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Manage Orders
      </h2>

      {loading ? (

        <div className="text-xl text-gray-500">
          Loading orders...
        </div>

      ) : orders.length === 0 ? (

        <div className="text-xl text-gray-500">
          No orders found
        </div>

      ) : (

        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order._id}
              className="border rounded-3xl p-6"
            >

              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

                <div>

                  <h3 className="text-2xl font-bold text-gray-800">
                    Order ID
                  </h3>

                  <p className="text-gray-500 break-all">
                    {order._id}
                  </p>

                </div>

                <div className="flex items-center gap-4">

                  <span className="font-semibold text-lg">
                    Status:
                  </span>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusUpdate(
                        order._id,
                        e.target.value
                      )
                    }
                    className="border px-4 py-2 rounded-xl outline-none"
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Delivered</option>
                    <option>Rejected</option>
                  </select>

                </div>
              </div>

              {/* Products */}
              <div className="space-y-5">

                {order.products.map((product, index) => (

                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-center justify-between border rounded-2xl p-4 gap-5"
                  >

                    <div className="flex flex-col md:flex-row items-center gap-5">

                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-24 h-24 rounded-xl object-cover"
                      />

                      <div>

                        <h4 className="text-xl font-bold text-gray-800">
                          {product.title}
                        </h4>

                        <p className="text-gray-500 mt-1">
                          Quantity: {product.quantity}
                        </p>

                        <p className="text-green-600 font-semibold mt-1">
                          ₹{product.price}
                        </p>

                      </div>
                    </div>

                    <div className="text-2xl font-bold text-green-600">
                      ₹{product.price * product.quantity}
                    </div>

                  </div>

                ))}

              </div>

              {/* Footer */}
              <div className="mt-6 border-t pt-5 flex justify-end">

                <div className="text-3xl font-bold text-green-600">
                  Total: ₹{order.totalPrice}
                </div>

              </div>
            </div>

          ))}
        </div>

      )}
    </div>
  );
}

export default ManageOrders;