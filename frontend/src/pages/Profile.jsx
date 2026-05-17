import { useEffect, useState } from "react";

import {
  getProfile,
  updateProfile,
} from "../services/authService";

function Profile() {

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [previewImage,
    setPreviewImage] =
    useState("");

  // FETCH PROFILE
  useEffect(() => {

    const fetchProfile =
      async () => {

        try {

          if (!currentUser) {

            return;
          }

          const userId =
            currentUser._id ||
            currentUser.id;

          const data =
            await getProfile(
              userId
            );

          setUser(data);

          setPreviewImage(
            data.profileImage
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchProfile();

  }, []);

  // INPUT CHANGE
  const handleChange = (
    e
  ) => {

    setUser({

      ...user,

      [e.target.name]:
        e.target.value,
    });
  };

  // IMAGE CHANGE
  const handleImageChange = (
    e
  ) => {

    const file =
      e.target.files[0];

    if (!file) return;

    // PREVIEW
    const imageUrl =
      URL.createObjectURL(file);

    setPreviewImage(
      imageUrl
    );

    // STORE FILE
    setUser({

      ...user,

      profileImage: file,
    });
  };

  // UPDATE PROFILE
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setSaving(true);

        const userId =
          currentUser._id ||
          currentUser.id;

        // FORM DATA
        const formData =
          new FormData();

        formData.append(
          "profileImage",
          user.profileImage
        );

        formData.append(
          "email",
          user.email
        );

        formData.append(
          "phone",
          user.phone
        );

        formData.append(
          "address",
          user.address
        );

        // IMAGE
        if (
          user.profileImage instanceof File
        ) {

          formData.append(
            "profileImage",
            user.profileImage
          );
        }

        const data =
          await updateProfile(
            userId,
            formData
          );

        alert(data.message);

        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        );

        setUser(data.user);

      } catch (error) {

        console.log(error);

        alert(
          "Profile update failed"
        );

      } finally {

        setSaving(false);
      }
    };

  // LOADING
  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <h1 className="text-2xl text-gray-500">
          Loading profile...
        </h1>

      </div>
    );
  }

  // NO USER
  if (!user) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <h1 className="text-2xl text-red-500">
          User not found
        </h1>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-md overflow-hidden">

        {/* HEADER */}
        <div className="bg-green-600 p-10 text-white flex flex-col md:flex-row items-center gap-8">

          <div className="relative">

            <img
              src={previewImage}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-white object-cover"
            />

            {/* IMAGE INPUT */}
            <label className="absolute bottom-0 right-0 bg-white text-green-600 px-4 py-2 rounded-full shadow cursor-pointer text-sm font-semibold">

              Change

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
                className="hidden"
              />

            </label>

          </div>

          <div>

            <h1 className="text-4xl font-bold">
              {user.name}
            </h1>

            <p className="text-green-100 mt-2 text-lg">
              {user.email}
            </p>

          </div>

        </div>

        {/* FORM */}
        <div className="p-8">

          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Edit Profile
          </h2>

          <form
            onSubmit={
              handleSubmit
            }
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            {/* NAME */}
            <div>

              <label className="block mb-2 text-gray-700 font-semibold">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={
                  user.name || ""
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-xl px-5 py-4 outline-none focus:border-green-500"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label className="block mb-2 text-gray-700 font-semibold">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={
                  user.email || ""
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-xl px-5 py-4 outline-none focus:border-green-500"
              />

            </div>

            {/* PHONE */}
            <div>

              <label className="block mb-2 text-gray-700 font-semibold">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={
                  user.phone || ""
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-xl px-5 py-4 outline-none focus:border-green-500"
              />

            </div>

            {/* ADDRESS */}
            <div className="md:col-span-2">

              <label className="block mb-2 text-gray-700 font-semibold">
                Address
              </label>

              <textarea
                name="address"
                rows={5}
                value={
                  user.address || ""
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-xl px-5 py-4 outline-none focus:border-green-500"
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 transition text-white py-4 rounded-xl text-lg font-semibold md:col-span-2"
            >
              {saving
                ? "Saving..."
                : "Update Profile"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Profile;