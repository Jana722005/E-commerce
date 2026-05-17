import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});


// REGISTER
export const registerUser = async (
  userData
) => {

  const response = await API.post(
    "/register",
    userData
  );

  return response.data;
};


// LOGIN
export const loginUser = async (
  userData
) => {

  const response = await API.post(
    "/login",
    userData
  );

  return response.data;
};


// GET PROFILE
export const getProfile = async (id) => {

  const response = await API.get(
    `/profile/${id}`
  );

  return response.data;
};


// UPDATE PROFILE
export const updateProfile =
  async (id, formData) => {

    const response =
      await API.put(
        `/profile/${id}`,
        formData,
        {

          headers: {

            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

// ADD TO WISHLIST
export const addToWishlist =
  async (
    userId,
    productId
  ) => {

    const response = await API.post(
      `/wishlist/${userId}`,
      {
        productId,
      }
    );

    return response.data;
  };


// GET WISHLIST
export const getWishlist =
  async (userId) => {

    const response = await API.get(
      `/wishlist/${userId}`
    );

    return response.data;
  };


// REMOVE FROM WISHLIST
export const removeFromWishlist =
  async (
    userId,
    productId
  ) => {

    const response =
      await API.delete(
        `/wishlist/${userId}/${productId}`
      );

    return response.data;
  };