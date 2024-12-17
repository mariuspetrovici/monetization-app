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

router.post("/login", login);
router.post("/logout", logout);
router.post("/checkAuth", checkAuth);
router.post("/users", createUser);
router.get("/users", getAllUsers);
router.put("/users/:id", updateUser);
router.delete("/users:id", deleteUser);

module.exports = router;
