const Product = require(
  "../models/Product"
);

// CREATE PRODUCT
const createProduct =
  async (req, res) => {

    try {

      const {

        title,

        description,

        category,

        price,

        quantity,

      } = req.body;

      const image =
        req.file?.path || "";

      const product =
        await Product.create({

          title,

          description,

          category,

          price,

          quantity,

          image,
        });

      res.status(201).json(
        product
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,
      });
    }
  };


// GET PRODUCTS
const getProducts =
  async (req, res) => {

    try {

      const products =
        await Product.find()
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        products
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,
      });
    }
  };


// ADD REVIEW
const addReview =
  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res
          .status(404)
          .json({

            message:
              "Product not found",
          });
      }

      const review = {
        user: req.body.userId || req.body.user,
        name: req.body.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };

      product.reviews.push(
        review
      );

      // AVERAGE RATING
      product.averageRating =

        product.reviews.reduce(
          (
            total,
            item
          ) =>

            total +
            item.rating,

          0
        ) /

        product.reviews.length;

      await product.save();

      res.status(200).json({

        message:
          "Review added",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,
      });
    }
  };


// UPDATE PRODUCT
const updateProduct =
  async (req, res) => {

    try {

      const product =
        await Product.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }
        );

      res.status(200).json(
        product
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,
      });
    }
  };


// DELETE PRODUCT
const deleteProduct =
  async (req, res) => {

    try {

      await Product.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({

        message:
          "Product deleted",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,
      });
    }
  };

module.exports = {

  createProduct,

  getProducts,

  addReview,

  updateProduct,

  deleteProduct,
};