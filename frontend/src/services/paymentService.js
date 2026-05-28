import API from "./api";

// CREATE PAYMENT ORDER
export const createPaymentOrder = async (amount) => {
  const response = await API.post("/payment/create-order", {
    amount,
  });
  return response.data;
};