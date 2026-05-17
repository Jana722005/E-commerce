import API from "./api";

// GET PRODUCTS
export const getProducts =
  async () => {

    const response =
      await API.get(
        "/products"
      );

    return response.data;
  };


// CREATE PRODUCT
export const createProduct =
  async (formData) => {

    const response =
      await API.post(
        "/products",
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


// DELETE PRODUCT
export const deleteProduct =
  async (id) => {

    const response =
      await API.delete(
        `/products/${id}`
      );

    return response.data;
  };


// UPDATE PRODUCT
export const updateProduct =
  async (
    id,
    productData
  ) => {

    const response =
      await API.put(
        `/products/${id}`,
        productData
      );

    return response.data;
  };


// ADD REVIEW
export const addReview =
  async (
    productId,
    reviewData
  ) => {

    const response =
      await API.post(
        `/products/${productId}/reviews`,
        reviewData
      );

    return response.data;
  };