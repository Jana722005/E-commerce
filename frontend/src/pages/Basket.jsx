import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/slices/cartSlice";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaTrash,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

function Basket() {

  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  // SAFE CART STATE
  const cartItems =
    useSelector(
      (state) =>
        state.cart?.cartItems || []
    );

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

  // CHECKOUT
  const handleCheckout =
    () => {

      if (
        cartItems.length === 0
      ) {

        alert(
          "Basket is empty"
        );

        return;
      }

      navigate(
        "/checkout"
      );
    };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">

          <h1 className="text-4xl font-bold text-gray-800">

            My Basket

          </h1>

          <div className="text-lg text-gray-500">

            {cartItems.length}
            {" "}
            Items

          </div>

        </div>

        {/* EMPTY */}
        {cartItems.length === 0 ? (

          <div className="bg-white p-16 rounded-3xl shadow-md text-center">

            <h2 className="text-3xl font-bold text-gray-700">

              Your basket is empty

            </h2>

            <p className="text-gray-500 mt-4">

              Add products to continue shopping

            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">

              {cartItems.map(
                (item) => (

                  <div
                    key={item._id}
                    className="bg-white rounded-3xl shadow-md p-5 flex flex-col md:flex-row gap-5"
                  >

                    {/* IMAGE */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full md:w-40 h-40 object-cover rounded-2xl"
                    />

                    {/* CONTENT */}
                    <div className="flex-1">

                      <div className="flex items-start justify-between">

                        <div>

                          <h2 className="text-2xl font-bold text-gray-800">

                            {item.title}

                          </h2>

                          <p className="text-gray-500 mt-2">

                            {item.category}

                          </p>

                        </div>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            dispatch(
                              removeFromCart(
                                item._id
                              )
                            )
                          }
                          className="text-red-500 hover:text-red-600 text-xl"
                        >

                          <FaTrash />

                        </button>

                      </div>

                      {/* PRICE */}
                      <div className="mt-5 text-2xl font-bold text-green-600">

                        ₹{item.price}

                      </div>

                      {/* QUANTITY */}
                      <div className="mt-5 flex items-center gap-4">

                        {/* DECREASE */}
                        <button
                          onClick={() =>
                            dispatch(
                              decreaseQuantity(
                                item._id
                              )
                            )
                          }
                          className="bg-gray-100 hover:bg-gray-200 transition p-3 rounded-xl"
                        >

                          <FaMinus />

                        </button>

                        {/* QUANTITY */}
                        <span className="text-xl font-bold">

                          {item.quantity}

                        </span>

                        {/* INCREASE */}
                        <button
                          onClick={() =>
                            dispatch(
                              increaseQuantity(
                                item._id
                              )
                            )
                          }
                          className="bg-gray-100 hover:bg-gray-200 transition p-3 rounded-xl"
                        >

                          <FaPlus />

                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

            {/* RIGHT */}
            <div className="bg-white rounded-3xl shadow-md p-8 h-fit sticky top-28">

              <h2 className="text-3xl font-bold text-gray-800 mb-8">

                Order Summary

              </h2>

              {/* ITEMS */}
              <div className="space-y-5">

                {cartItems.map(
                  (item) => (

                    <div
                      key={item._id}
                      className="flex items-center justify-between"
                    >

                      <div>

                        <h3 className="font-semibold text-gray-800">

                          {item.title}

                        </h3>

                        <p className="text-sm text-gray-500">

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

                <div className="flex items-center justify-between text-2xl font-bold">

                  <span>
                    Total
                  </span>

                  <span className="text-green-600">

                    ₹{totalPrice}

                  </span>

                </div>

              </div>

              {/* BUTTON */}
              <button
                onClick={
                  handleCheckout
                }
                className="w-full mt-8 bg-green-600 hover:bg-green-700 transition text-white py-4 rounded-2xl text-lg font-semibold"
              >

                Proceed To Checkout

              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Basket;