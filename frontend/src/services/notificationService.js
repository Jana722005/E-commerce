import API from "./api";

// GET NOTIFICATIONS
export const getNotifications = async (userId) => {
  const response = await API.get(`/notifications/${userId}`);
  return response.data;
};

// MARK AS READ
export const markAsRead = async (id) => {
  const response = await API.put(`/notifications/${id}`);
  return response.data;
};