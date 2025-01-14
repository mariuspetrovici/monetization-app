const { Op } = require("sequelize");

exports.SubscriptionService = ({ User, Subscription, UserSubscription }) => {
  const getAllSubscriptions = async () => {
    const subscriptions = await Subscription.findAll({
      where: {
        price: {
          [Op.gt]: 0,
        },
      },
    });
    return subscriptions;
  };

  const purchaseSubscription = async (userId, subscriptionId) => {
    const subscription = await Subscription.findByPk(subscriptionId);
    if (!subscription) {
      throw new Error("Subscription not found");
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + subscription.durationDays);

    const userSubscription = await UserSubscription.findOne({
      where: { userId },
    });

    if (userSubscription) {
      // Update existing subscription
      await userSubscription.update({
        subscriptionId,
        startDate,
        endDate,
      });
    } else {
      // Create a new subscription entry
      await UserSubscription.create({
        userId,
        subscriptionId,
        startDate,
        endDate,
      });
    }

    return {
      id: subscription.id,
      name: subscription.name,
      price: subscription.price,
      durationDays: subscription.durationDays,
      startDate,
      endDate,
    };
  };

  return { purchaseSubscription, getAllSubscriptions };
};
