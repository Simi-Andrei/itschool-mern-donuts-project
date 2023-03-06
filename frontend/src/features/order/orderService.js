import axios from "axios";

// place order
const placeOrder = async (order, token) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post("/api/orders", order, config);
  return data;
};

// get order
const getOrder = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(`/api/orders/${id}`, config);
  return data;
};

// pay order
const payOrder = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(`/api/orders/${id}/pay`, {}, config);
  return data;
};

// deliver order
const deliverOrder = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, config);
  return data;
};

// get orders
const getOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(`/api/orders/my-orders`, config);
  return data;
};

// get all orders
const getAllOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(`/api/orders`, config);
  return data;
};

const placeOrderService = {
  placeOrder,
  getOrder,
  payOrder,
  deliverOrder,
  getOrders,
  getAllOrders,
};

export default placeOrderService;
