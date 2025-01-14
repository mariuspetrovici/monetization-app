const { UserSubscription, Subscription } = require("../models");

exports.updateUserSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.body; // ID of the chosen subscription plan
    const userId = req.user.id; // Get userId from the authenticated user (req.user)

    // Fetch the subscription details
    const subscription = await Subscription.findByPk(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription plan not found" });
    }

    // Calculate the new startDate and endDate
    const startDate = new Date(); // Today
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + subscription.durationDays); // Add the duration

    // Update or create the user's subscription
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

    res.status(200).json({
      message: "Subscription updated successfully",
      subscription: {
        name: subscription.name,
        price: subscription.price,
        durationDays: subscription.durationDays,
        startDate,
        endDate,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
