import {
  useState,
} from "react";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

import {
  clearCart,
} from "../redux/slices/cartSlice";

import {
  placeOrder,
} from "../services/orderService";

function Checkout() {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const cartItems =
    useSelector(
      (state) =>
        state.cart.cartItems
    );

  const [name,
    setName] =
    useState("");

  const [phone,
    setPhone] =
    useState("");

  const [city,
    setCity] =
    useState("");

  const [pincode,
    setPincode] =
    useState("");

  const [address,
    setAddress] =
    useState("");

  const [paymentMethod,
    setPaymentMethod] =
    useState("COD");

  const [loading,
    setLoading] =
    useState(false);

  // TOTAL PRICE
  const totalPrice =
    cartItems.reduce(

      (
        total,
        item
      ) =>

        total +
        item.price *
        item.quantity,

      0
    );

  // PLACE ORDER
  const handlePlaceOrder =
    async () => {

      try {

        setLoading(true);

        // USER
        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        // ORDER DATA
        const storedUser =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );
          console.log(storedUser);

        const orderData = {

          user:
            storedUser?.id,

          products:
            cartItems,

          shippingAddress: {

            name,

            phone,

            city,

            pincode,

            address,
          },

          paymentMethod,

          totalPrice,
        };

        // COD
        if (
          paymentMethod ===
          "COD"
        ) {

          await placeOrder(
            orderData
          );

          dispatch(
            clearCart()
          );

          alert(
            "Order placed successfully"
          );

          navigate(
            "/orders"
          );

          return;
        }

        // RAZORPAY
        const {
          data,
        } = await API.post(
          "/payment/create-order",
          {
            amount:
              totalPrice,
          }
        );

        const options = {

          key:
            import.meta.env
              .VITE_RAZORPAY_KEY_ID,

          amount:
            data.amount,

          currency:
            data.currency,

          name:
            "Musalamma Grocery",

          description:
            "Order Payment",

          order_id:
            data.id,

          handler:
            async function () {

              await placeOrder(
                orderData
              );

              dispatch(
                clearCart()
              );

              alert(
                "Payment successful & order placed"
              );

              navigate(
                "/orders"
              );
            },

          theme: {

            color:
              "#16a34a",
          },
        };

        const razorpay =
          new window.Razorpay(
            options
          );

        razorpay.open();

      } catch (error) {

        console.log(error);

        alert(
          "Oops! Something went wrong"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold text-gray-800">
            Checkout
          </h1>

          <p className="text-gray-500 mt-2">
            Complete your order
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* FORM */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-md p-6 md:p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-8">

              Shipping Information

            </h2>

            <div className="space-y-6">

              {/* NAME */}
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-green-500"
              />

              {/* PHONE */}
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-green-500"
              />

              {/* CITY */}
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) =>
                  setCity(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-green-500"
              />

              {/* PINCODE */}
              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) =>
                  setPincode(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-green-500"
              />

              {/* ADDRESS */}
              <textarea
                placeholder="Full Address"
                rows={5}
                value={address}
                onChange={(e) =>
                  setAddress(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-green-500"
              />

              {/* PAYMENT */}
              <div>

                <h3 className="text-xl font-bold text-gray-800 mb-5">

                  Payment Method

                </h3>

                <div className="space-y-4">

                  {/* COD */}
                  <label className="flex items-center gap-4 border rounded-2xl p-5 cursor-pointer">

                    <input
                      type="radio"
                      checked={
                        paymentMethod ===
                        "COD"
                      }
                      onChange={() =>
                        setPaymentMethod(
                          "COD"
                        )
                      }
                    />

                    Cash on Delivery

                  </label>

                  {/* RAZORPAY */}
                  <label className="flex items-center gap-4 border rounded-2xl p-5 cursor-pointer">

                    <input
                      type="radio"
                      checked={
                        paymentMethod ===
                        "RAZORPAY"
                      }
                      onChange={() =>
                        setPaymentMethod(
                          "RAZORPAY"
                        )
                      }
                    />

                    Razorpay

                  </label>

                </div>

              </div>

            </div>

          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white rounded-3xl shadow-md p-6 md:p-8 h-fit">

            <h2 className="text-2xl font-bold text-gray-800 mb-8">

              Order Summary

            </h2>

            <div className="space-y-5">

              {cartItems.map(
                (item) => (

                  <div
                    key={item._id}
                    className="flex items-center gap-4"
                  >

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-2xl"
                    />

                    <div className="flex-1">

                      <h3 className="font-bold text-gray-800">

                        {item.title}

                      </h3>

                      <p className="text-gray-500 mt-1">

                        Qty:
                        {" "}
                        {item.quantity}

                      </p>

                    </div>

                    <div className="font-bold text-green-600">

                      ₹
                      {
                        item.price *
                        item.quantity
                      }

                    </div>

                  </div>

                )
              )}

            </div>

            {/* TOTAL */}
            <div className="border-t mt-8 pt-6">

              <div className="flex items-center justify-between">

                <h3 className="text-2xl font-bold text-gray-800">

                  Total

                </h3>

                <h3 className="text-3xl font-bold text-green-600">

                  ₹
                  {totalPrice}

                </h3>

              </div>

            </div>

            {/* BUTTON */}
            <button
              onClick={
                handlePlaceOrder
              }
              disabled={loading}
              className="w-full mt-8 bg-green-600 hover:bg-green-700 transition text-white py-5 rounded-2xl font-bold text-lg"
            >

              {loading
                ? "Processing..."
                : "Place Order"}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;