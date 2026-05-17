import axios from "axios";

const API = axios.create({
  baseURL:
    "http://localhost:5000/api/payment",
});


// CREATE PAYMENT ORDER
export const createPaymentOrder =
  async (amount) => {

    const response = await API.post(
      "/create-order",
      {
        amount,
      }
    );

    return response.data;
  };