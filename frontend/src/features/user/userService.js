import axios from "axios";

// register user
const register = async (currentUser) => {
  const { data } = await axios.post("/api/users", currentUser);

  if (data) {
    localStorage.setItem("currentUser", JSON.stringify(data));
  }

  return data;
};

// login user
const login = async (currentUser) => {
  const { data } = await axios.post("/api/users/login", currentUser);

  if (data) {
    localStorage.setItem("currentUser", JSON.stringify(data));
  }
  return data;
};

// get profile
const getProfile = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(`/api/users/${id}`, config);
  return data;
};

// update profile
const updateProfile = async (currentUser, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put("/api/users/profile", currentUser, config);
  if (data) {
    localStorage.setItem("currentUser", JSON.stringify(data));
  }
  return data;
};

// get all users
const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get("/api/users", config);
  return data;
};

// get user
const getUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(`/api/users/${id}`, config);
  return data;
};

// update user
const updateUser = async (user, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(`/api/users/${user._id}`, user, config);
  return data;
};

// delete user
const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.delete(`/api/users/${id}`, config);
  return data;
};

const userService = {
  register,
  login,
  getProfile,
  updateProfile,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};

export default userService;
