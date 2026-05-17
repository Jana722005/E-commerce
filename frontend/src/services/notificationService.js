import axios from "axios";

const API = axios.create({
  baseURL:
    "http://localhost:5000/api/notifications",
});


// GET NOTIFICATIONS
export const getNotifications =
  async (userId) => {

    const response = await API.get(
      `/${userId}`
    );

    return response.data;
  };


// MARK AS READ
export const markAsRead =
  async (id) => {

    const response = await API.put(
      `/${id}`
    );

    return response.data;
  };