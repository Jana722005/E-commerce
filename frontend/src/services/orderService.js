import API from "./api";

// PLACE ORDER
export const placeOrder =
  async (orderData) => {

    const response =
      await API.post(

        "/orders",

        orderData
      );

    return response.data;
  };


// GET USER ORDERS
export const getUserOrders =
  async () => {

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    const response =
      await API.get(

        "/orders/my-orders",

        {
          headers: {

            userid:
              user?.id,
          },
        }
      );

    return response.data;
  };


// GET ALL ORDERS
export const getAllOrders =
  async () => {

    const response =
      await API.get(
        "/orders"
      );

    return response.data;
  };


// UPDATE ORDER STATUS
export const updateOrderStatus =
  async (
    id,
    status
  ) => {

    const response =
      await API.put(

        `/orders/${id}`,

        { status }
      );

    return response.data;
  };