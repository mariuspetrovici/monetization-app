const { Course, Page } = require("../models");

exports.createCourse = async (req, res) => {
  try {
    const {
      title,
      pageNrBlockers = [],
      pages,
      price = 0,
      packageId,
      status = "active",
    } = req.body;

    let course = await Course.create({
      title,
      pageNrBlockers,
      pages,
      price,
      packageId,
      status,
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      paranoid: false,
      include: [
        {
          model: Page,
          attributes: ["id", "content"],
          as: "allContent",
        },
      ],
    });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id, {
      paranoid: false,
      include: [
        {
          model: Page,
          attributes: ["id", "content"],
          where: { courseId: id },
          as: "allContent",
          required: false,
        },
      ],
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      pages,
      packageId,
      pageNrBlockers = [],
      status = "active",
      price = 0,
    } = req.body;

    const updatedCourse = await Course.update(
      {
        title,
        pages,
        pageNrBlockers,
        status,
        packageId,
        price,
      },
      {
        where: { id },
      }
    );

    res.json({ message: "Course updated successfully", updatedCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.destroy({ where: { id } });
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
