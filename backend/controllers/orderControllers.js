const Order = require("../models/orderModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// place order
const placeOrder = asyncHandler(async (req, res) => {
  const {
    items,
    deliveryAddress,
    paymentMethod,
    itemsPrice,
    deliveryPrice,
    totalPrice,
  } = req.body;

  if (items && items.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      user: req.user.id,
      items,
      deliveryAddress,
      paymentMethod,
      itemsPrice,
      deliveryPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// get orders
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });

  if (orders) {
    res.json(orders);
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// get all orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");

  if (orders) {
    res.json(orders);
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// get single order
const getSingleOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id).populate("user", "name email");

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// pay order
const payOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// deliver order
const deliverOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

module.exports = {
  placeOrder,
  getOrders,
  getSingleOrder,
  payOrder,
  getAllOrders,
  deliverOrder,
};
