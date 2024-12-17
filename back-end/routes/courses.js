const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
} = require("../controllers/coursesController");

router.post("/", createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
