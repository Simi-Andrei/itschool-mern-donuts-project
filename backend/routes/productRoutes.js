const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  bestSeller,
  getProductsCategories,
  getProductsByCategory,
} = require("../controllers/productControllers");
const { protect, admin } = require("../middleware/userMiddleware");

const router = express.Router();

router.route("/").get(getAllProducts).post(protect, admin, createProduct);
router.route("/top").get(bestSeller);
router.route("/categories").get(getProductsCategories);
router.route("/category/:category").get(getProductsByCategory);
router
  .route("/:id")
  .get(getSingleProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
