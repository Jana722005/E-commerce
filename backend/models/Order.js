const mongoose =
  require("mongoose");

const orderSchema =
  new mongoose.Schema(

    {

      user: {

        type: String,

        required: true,
      },

      products: [

        {
          title: String,

          image: String,

          price: Number,

          quantity: Number,
        },
      ],

      shippingAddress: {

        name: String,

        phone: String,

        city: String,

        pincode: String,

        address: String,
      },

      paymentMethod: {

        type: String,

        default: "COD",
      },

      totalPrice: {

        type: Number,

        required: true,
      },

      status: {

        type: String,

        default: "Pending",
      },
    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );