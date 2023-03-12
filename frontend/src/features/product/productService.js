import axios from "axios";

// get all products
const getAllProducts = async ({ category = "", order = "" }) => {
  const { data } = await axios.get(
    `/api/products?category=${category}&order=${order}`
  );
  return data;
};

// get single product
const getSingleProduct = async (id) => {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
};

// update product
const updateProduct = async (product, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(
    `/api/products/${product._id}`,
    product,
    config
  );
  return data;
};

// delete product
const deleteProduct = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.delete(`/api/products/${id}`, config);
  return data;
};

// get top products
const getTopProducts = async () => {
  const { data } = await axios.get("/api/products/top");
  return data;
};

// get product categories
const getProductCategories = async () => {
  const { data } = await axios.get("/api/products/categories");
  return data;
};

// get product categories
const getProductsByCategory = async (category) => {
  const { data } = await axios.get(`/api/products/category/${category}`);
  return data;
};

const productService = {
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getTopProducts,
  getProductCategories,
  getProductsByCategory,
};

export default productService;
