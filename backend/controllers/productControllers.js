const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// get all products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// get single product
const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

// create product
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, image, sold } = req.body;

  if (!name || !description || !price || !stock || !image || !sold) {
    res.status(400);
    throw new Error("Please fill in all the fields");
  }

  const newProduct = await Product.create({
    name,
    description,
    price,
    stock,
    image,
    sold,
  });
  res.status(201).json(newProduct);
});

// update product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, sold } = req.body;

  if (!name || !description || !price || !stock || !sold) {
    res.status(400);
    throw new Error("Please fill in all the fields");
  }

  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    product.name = name;
    product.price = price;
    product.image = "/images/productsImages/25.png";
    product.description = description;
    product.stock = stock;
    product.sold = sold;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  }
});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.remove();

  res.status(200).json({ message: "Product removed" });
});

// best seller
const bestSeller = asyncHandler(async (req, res) => {
  const bestSellingProducts = await Product.find()
    .sort([["sold", -1]])
    .limit(10);
  res.status(200).json(bestSellingProducts);
});

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  bestSeller,
};
