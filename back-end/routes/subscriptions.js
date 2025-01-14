let express = require("express");
let router = express.Router();

const {
  subscriptionController,
} = require("../controllers/subscriptionsController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/", authMiddleware(), subscriptionController.getAll);
router.post("/purchase", authMiddleware(), subscriptionController.purchase);

module.exports = router;
