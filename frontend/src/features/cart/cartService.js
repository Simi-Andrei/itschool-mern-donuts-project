import axios from "axios";

// add item to cart
const addItemToCart = async (id) => {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
};

const cartService = { addItemToCart };

export default cartService;
