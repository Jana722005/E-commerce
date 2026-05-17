import {
  useEffect,
  useState,
} from "react";

import {
  getUserOrders,
} from "../services/orderService";

function Orders() {

  const [orders,
    setOrders] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  // FETCH ORDERS
  useEffect(() => {

    const fetchOrders =
      async () => {

        try {

          const data =
            await getUserOrders();

          setOrders(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchOrders();

  }, []);

  // LOADING
  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <h1 className="text-3xl font-bold text-gray-600">

          Loading Orders...

        </h1>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold text-gray-800">

            My Orders

          </h1>

          <p className="text-gray-500 mt-2">

            Track all your grocery orders

          </p>

        </div>

        {/* EMPTY */}
        {orders.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-md p-10 text-center">

            <h2 className="text-3xl font-bold text-gray-600">

              No Orders Found

            </h2>

            <p className="text-gray-400 mt-3">

              Your placed orders will appear here

            </p>

          </div>

        ) : (

          <div className="space-y-8">

            {orders.map(
              (order) => (

                <div
                  key={order._id}
                  className="bg-white rounded-3xl shadow-md overflow-hidden"
                >

                  {/* TOP */}
                  <div className="bg-green-600 text-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                      <h2 className="text-2xl font-bold">

                        Order #
                        {
                          order._id.slice(-6)
                        }

                      </h2>

                      <p className="mt-2 opacity-90">

                        {
                          new Date(
                            order.createdAt
                          ).toLocaleString()
                        }

                      </p>

                    </div>

                    <div className="flex flex-col md:items-end gap-2">

                      <span className="bg-white text-green-700 px-5 py-2 rounded-full font-bold">

                        {
                          order.status
                        }

                      </span>

                      <p className="font-semibold">

                        {
                          order.paymentMethod
                        }

                      </p>

                    </div>

                  </div>

                  {/* BODY */}
                  <div className="p-6 md:p-8">

                    {/* SHIPPING */}
                    <div className="mb-8">

                      <h3 className="text-2xl font-bold text-gray-800 mb-5">

                        Shipping Details

                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div className="bg-gray-50 rounded-2xl p-5">

                          <p className="text-gray-500">
                            Name
                          </p>

                          <h4 className="font-bold text-lg text-gray-800 mt-2">

                            {
                              order.shippingAddress?.name
                            }

                          </h4>

                        </div>

                        <div className="bg-gray-50 rounded-2xl p-5">

                          <p className="text-gray-500">
                            Phone
                          </p>

                          <h4 className="font-bold text-lg text-gray-800 mt-2">

                            {
                              order.shippingAddress?.phone
                            }

                          </h4>

                        </div>

                        <div className="bg-gray-50 rounded-2xl p-5">

                          <p className="text-gray-500">
                            City
                          </p>

                          <h4 className="font-bold text-lg text-gray-800 mt-2">

                            {
                              order.shippingAddress?.city
                            }

                          </h4>

                        </div>

                        <div className="bg-gray-50 rounded-2xl p-5">

                          <p className="text-gray-500">
                            Pincode
                          </p>

                          <h4 className="font-bold text-lg text-gray-800 mt-2">

                            {
                              order.shippingAddress?.pincode
                            }

                          </h4>

                        </div>

                      </div>

                      {/* ADDRESS */}
                      <div className="bg-gray-50 rounded-2xl p-5 mt-5">

                        <p className="text-gray-500">
                          Address
                        </p>

                        <h4 className="font-bold text-lg text-gray-800 mt-2">

                          {
                            order.shippingAddress?.address
                          }

                        </h4>

                      </div>

                    </div>

                    {/* PRODUCTS */}
                    <div>

                      <h3 className="text-2xl font-bold text-gray-800 mb-6">

                        Ordered Products

                      </h3>

                      <div className="space-y-5">

                        {order.products?.map(
                          (
                            product,
                            index
                          ) => (

                            <div
                              key={index}
                              className="flex flex-col md:flex-row gap-5 bg-gray-50 rounded-2xl p-5"
                            >

                              {/* IMAGE */}
                              <img
                                src={product.image}
                                alt={product.title}
                                className="w-28 h-28 object-cover rounded-2xl"
                              />

                              {/* INFO */}
                              <div className="flex-1">

                                <h4 className="text-2xl font-bold text-gray-800">

                                  {
                                    product.title
                                  }

                                </h4>

                                <p className="text-gray-500 mt-2">

                                  Quantity:
                                  {" "}
                                  {
                                    product.quantity
                                  }

                                </p>

                                <p className="text-green-600 text-2xl font-bold mt-4">

                                  ₹
                                  {
                                    product.price
                                  }

                                </p>

                              </div>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                    {/* TOTAL */}
                    <div className="mt-10 flex justify-end">

                      <div className="bg-green-50 px-8 py-6 rounded-3xl">

                        <p className="text-gray-500 mb-2">

                          Total Amount

                        </p>

                        <h2 className="text-4xl font-bold text-green-700">

                          ₹
                          {
                            order.totalPrice
                          }

                        </h2>

                      </div>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default Orders;