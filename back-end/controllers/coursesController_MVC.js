// controllers/courseController.js
const { Course } = require("../models");

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({ paranoid: false });

    res.render("courses", { courses });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getCreateCourseForm = (req, res) => {
  res.render("courses/create");
};

exports.createCourse = async (req, res) => {
  console.log("----------------- REQ BODY: ", req.body);
  const { title, status = "active", price = 0, pageNrBlockers = 0,  } = req.body;
  try {
    await Course.create({ title, status, price: Number(price) });
    res.redirect("/courses");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getEditCourseForm = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, { paranoid: false });
    res.render("courses/edit", { course });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateCourse = async (req, res) => {
  const { title, price = 0, status = "active" } = req.body;
  try {
    await Course.update(
      { title, status, price: Number(price) },
      { where: { id: req.params.id } }
    );
    res.redirect("/courses");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.destroy({ where: { id: req.params.id } });
    res.redirect("/courses");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
