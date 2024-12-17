const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController_MVC");

router.get("/pages", pagesController.getPages);
router.get("/courses/:courseId/pages", pagesController.getPagesByCourse);

router.get("/pages/create", pagesController.createPageForm);
router.post("/pages", pagesController.createPage);
router.get("/pages/:pageId/edit", pagesController.editPageForm);
router.post("/pages/:pageId/edit", pagesController.editPage);
router.delete("/pages/:pageId", pagesController.deletePage);

module.exports = router;
