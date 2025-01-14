const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
} = require("../controllers/coursesController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware(), createCourse);
router.get("/", authMiddleware(), getAllCourses);
router.get("/:id", authMiddleware(), getCourse);
router.put("/:id", authMiddleware(), updateCourse);
router.delete("/:id", authMiddleware(), deleteCourse);

module.exports = router;
