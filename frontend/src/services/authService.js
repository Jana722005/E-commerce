import API from "./api";

// REGISTER
export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

// LOGIN
export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};

// GET PROFILE
export const getProfile = async (id) => {
  const response = await API.get(`/auth/profile/${id}`);
  return response.data;
};

// UPDATE PROFILE
export const updateProfile = async (id, formData) => {
  const response = await API.put(`/auth/profile/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// ADD TO WISHLIST
export const addToWishlist = async (userId, productId) => {
  const response = await API.post(`/auth/wishlist/${userId}`, {
    productId,
  });
  return response.data;
};

// GET WISHLIST
export const getWishlist = async (userId) => {
  const response = await API.get(`/auth/wishlist/${userId}`);
  return response.data;
};

// REMOVE FROM WISHLIST
export const removeFromWishlist = async (userId, productId) => {
  const response = await API.delete(`/auth/wishlist/${userId}/${productId}`);
  return response.data;
};