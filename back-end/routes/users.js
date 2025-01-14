const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  checkAuth,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/login", login);
router.post("/logout", logout);
router.post("/checkAuth", checkAuth);
router.post("/users", createUser);
router.get("/users", authMiddleware(), getAllUsers);
router.put("/users/:id", authMiddleware(), updateUser);
router.delete("/users:id", authMiddleware(), deleteUser);

module.exports = router;
