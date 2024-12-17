let express = require("express");
let router = express.Router();

const {
  subscriptionController,
} = require("../controllers/subscriptionsController");

router.post("/subscriptions/purchase", subscriptionController.purchase);

module.exports = router;
