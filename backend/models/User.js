const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // NAME
    name: {
      type: String,
      required: true,
    },

    // EMAIL
    email: {
      type: String,
      required: true,
      unique: true,
    },

    // PASSWORD
    password: {
      type: String,
      required: true,
    },

    // ROLE
    role: {
      type: String,
      default: "customer",
    },

    // PHONE
    phone: {
      type: String,
      default: "",
    },

    // ADDRESS
    address: {
      type: String,
      default: "",
    },

    // PROFILE IMAGE
    profileImage: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },

    // WISHLIST
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);