const express = require("express");
const router = express.Router();
const courseController = require("../controllers/coursesController_MVC");

router.get("/", courseController.getAllCourses);
router.get("/create", courseController.getCreateCourseForm);
router.post("/create", courseController.createCourse);
router.get("/edit/:id", courseController.getEditCourseForm);
router.post("/edit/:id", courseController.updateCourse);
router.get("/delete/:id", courseController.deleteCourse);

module.exports = router;
