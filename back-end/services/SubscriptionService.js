exports.SubscriptionService = ({ User, Subscription, UserSubscription }) => {
  const purchaseSubscription = async (userId, subscriptionId) => {
    const subscription = await Subscription.findByPk(subscriptionId);
    if (!subscription) {
      throw new Error("Subscription not found");
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + subscription.durationDays);

    const userSubscription = await UserSubscription.create({
      userId,
      subscriptionId,
      startDate,
      endDate,
    });

    return userSubscription;
  };

  return { purchaseSubscription };
};
