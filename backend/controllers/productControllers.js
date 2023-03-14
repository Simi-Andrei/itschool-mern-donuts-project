const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// get all products
const getAllProducts = asyncHandler(async (req, res) => {
  const category = req.query.category || "";
  const { order } = req.query || "";

  const categoryFilter = category ? { category } : {};
  const sortOrder =
    order === "low"
      ? { price: 1 }
      : order === "high"
      ? { price: -1 }
      : order === "rated"
      ? { rating: -1 }
      : { _id: 1 };

  const products = await Product.find({ ...categoryFilter }).sort(sortOrder);
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

// get products by category
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  const products = await Product.find({ category });

  if (!products) {
    res.status(404);
    throw new Error("Products not found");
  }

  res.status(200).json(products);
});

// create product
const createProduct = asyncHandler(async (req, res) => {
  const { name, category, description, price, stock, image, sold } = req.body;

  if (
    !name ||
    !category ||
    !description ||
    !price ||
    !stock ||
    !image ||
    !sold
  ) {
    res.status(400);
    throw new Error("Please fill in all the fields");
  }

  const newProduct = await Product.create({
    name,
    category,
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
    product.image = "/images/productImages/sample.png";
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

// product categories
const getProductsCategories = asyncHandler(async (req, res) => {
  const productCategories = await Product.find().distinct("category");
  res.status(200).json(productCategories);
});

// create review
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    res.status(400);
    throw new Error("Please fill in all the fields");
  }

  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added" });
  }
});

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  bestSeller,
  getProductsCategories,
  getProductsByCategory,
  createReview,
};
