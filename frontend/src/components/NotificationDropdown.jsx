import {
  useEffect,
  useState,
} from "react";

import {
  getNotifications,
  markAsRead,
} from "../services/notificationService";

function NotificationDropdown() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [notifications,
    setNotifications] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  // FETCH NOTIFICATIONS
  useEffect(() => {

    const fetchNotifications =
      async () => {

        try {

          const data =
            await getNotifications(
              user._id || user.id
            );

          setNotifications(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchNotifications();

  }, []);

  // MARK AS READ
  const handleRead =
    async (id) => {

      try {

        await markAsRead(id);

        setNotifications((prev) =>
          prev.map(
            (notification) =>
              notification._id === id
                ? {
                    ...notification,
                    isRead: true,
                  }
                : notification
          )
        );

      } catch (error) {

        console.log(error);
      }
    };

  // UNREAD COUNT
  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.isRead
    ).length;

  return (
    <div className="absolute top-16 right-0 w-96 bg-white shadow-2xl rounded-2xl p-5 z-50 border">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">

        <h2 className="text-2xl font-bold text-gray-800">
          Notifications
        </h2>

        <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
          {unreadCount}
        </div>

      </div>

      {/* BODY */}
      <div className="space-y-4 max-h-96 overflow-y-auto">

        {loading ? (

          <div className="text-gray-500">
            Loading...
          </div>

        ) : notifications.length === 0 ? (

          <div className="text-gray-500">
            No notifications
          </div>

        ) : (

          notifications.map(
            (notification) => (

              <div
                key={notification._id}
                onClick={() =>
                  handleRead(
                    notification._id
                  )
                }
                className={`p-4 rounded-xl border cursor-pointer transition

                  ${
                    notification.isRead
                      ? "bg-gray-50"
                      : "bg-green-50 border-green-300"
                  }
                `}
              >

                <p className="text-gray-800">
                  {notification.message}
                </p>

                <div className="text-sm text-gray-500 mt-2">

                  {new Date(
                    notification.createdAt
                  ).toLocaleString()}

                </div>

              </div>

            )
          )
        )}

      </div>
    </div>
  );
}

export default NotificationDropdown;