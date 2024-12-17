const { Page, Course } = require("../models");

exports.getPages = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.render("pages/index", { courses });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createPageForm = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.render("pages/create", { courses });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createPage = async (req, res) => {
  try {
    const { courseId, title, content } = req.body;
    await Page.create({ courseId, title, content });
    res.redirect(`/courses/${courseId}/pages`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.editPageForm = async (req, res) => {
  try {
    const page = await Page.findByPk(req.params.pageId);
    const courses = await Course.findAll();
    res.render("pages/edit", { page, courses });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.editPage = async (req, res) => {
  try {
    const { courseId, title, content } = req.body;
    await Page.update(
      { courseId, title, content },
      { where: { id: req.params.pageId } }
    );
    res.redirect(`/courses/${courseId}/pages`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getPagesByCourse = async (req, res) => {
  try {
    const pages = await Page.findAll({
      where: { courseId: req.params.courseId },
      attributes: ["id", "content"],
      include: [
        {
          model: Course,
          attributes: ["title"],
        },
      ],
    });

    const formattedPages = pages.map((page) => ({
      id: page.id,
      content: page.content,
      courseTitle: page.Course.title,
    }));

    res.json(formattedPages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePage = async (req, res) => {
  try {
    const pageId = req.params.id;
    await Page.destroy({
      where: { id: pageId },
    });
    res.redirect("/pages");
  } catch (error) {
    console.error("Error deleting page:", error);
    res.status(500).json({ error: error.message });
  }
};
