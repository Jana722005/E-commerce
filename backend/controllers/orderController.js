const Order = require(
  "../models/Order"
);

// PLACE ORDER
const placeOrder =
  async (req, res) => {

    try {

      const order =
        await Order.create(
          req.body
        );

      res.status(201).json(
        order
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,
      });
    }
  };


// GET USER ORDERS
const getUserOrders =
  async (req, res) => {

    try {

      const user =
        req.headers.userid;

      const orders =
        await Order.find({

          user,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json(
        orders
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,
      });
    }
  };


// GET ALL ORDERS
const getAllOrders =
  async (req, res) => {

    try {

      const orders =
        await Order.find()
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        orders
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,
      });
    }
  };


// UPDATE ORDER STATUS
const updateOrderStatus =
  async (req, res) => {

    try {

      const order =
        await Order.findByIdAndUpdate(

          req.params.id,

          {
            status:
              req.body.status,
          },

          {
            new: true,
          }
        );

      res.status(200).json(
        order
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,
      });
    }
  };

module.exports = {

  placeOrder,

  getUserOrders,

  getAllOrders,

  updateOrderStatus,
};