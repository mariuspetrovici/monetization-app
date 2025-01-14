const { SubscriptionService } = require("../services/SubscriptionService");
const { User, Subscription, UserSubscription } = require("../models");

const SubscriptionController = (subscriptionService) => {
  const getAll = async (req, res) => {
    try {
      const subscriptions = await subscriptionService.getAllSubscriptions();

      res.status(201).json(subscriptions);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const purchase = async (req, res) => {
    try {
      const { userId, subscriptionId } = req.body;

      const userSubscription = await subscriptionService.purchaseSubscription(
        userId,
        subscriptionId
      );

      res.status(201).json({
        message: "Subscription purchased successfully",
        subscription: userSubscription,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  return { purchase, getAll };
};

const subscriptionService = SubscriptionService({
  User,
  Subscription,
  UserSubscription,
});

exports.subscriptionController = SubscriptionController(subscriptionService);
