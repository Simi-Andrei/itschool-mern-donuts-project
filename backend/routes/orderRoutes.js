const express = require("express");
const {
  placeOrder,
  getOrders,
  getSingleOrder,
  payOrder,
  deliverOrder,
  getAllOrders,
} = require("../controllers/orderControllers");
const { protect, admin } = require("../middleware/userMiddleware");

const router = express.Router();

router.route("/").get(protect, admin, getAllOrders).post(protect, placeOrder);
router.route("/my-orders").get(protect, getOrders);
router.route("/:id").get(protect, getSingleOrder);
router.route("/:id/pay").put(protect, payOrder);
router.route("/:id/deliver").put(protect, admin, deliverOrder);

module.exports = router;
