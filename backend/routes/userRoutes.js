const express = require("express");
const {
  register,
  login,
  getMyInfo,
  updateMyInfo,
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
} = require("../controllers/userControllers");
const { protect, admin } = require("../middleware/userMiddleware");

const router = express.Router();

router.route("/").post(register).get(protect, admin, getAllUsers);
router.route("/login").post(login);
router.route("/profile").get(protect, getMyInfo).put(protect, updateMyInfo);
router
  .route("/:id")
  .get(protect, admin, getUser)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

module.exports = router;
