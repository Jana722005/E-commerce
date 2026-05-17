const express = require(
  "express"
);

const router =
  express.Router();

const upload = require(
  "../middleware/uploadMiddleware"
);

const {

  createProduct,

  getProducts,

  addReview,

  updateProduct,

  deleteProduct,

} = require(
  "../controllers/productController"
);

// CREATE PRODUCT
router.post(
  "/",
  upload.single("image"),
  createProduct
);

// GET PRODUCTS
router.get(
  "/",
  getProducts
);

// ADD REVIEW
router.post(
  "/:id/reviews",
  addReview
);

// UPDATE PRODUCT
router.put(
  "/:id",
  updateProduct
);

// DELETE PRODUCT
router.delete(
  "/:id",
  deleteProduct
);

module.exports = router;