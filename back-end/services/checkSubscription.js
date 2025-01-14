exports.checkSubscription = (
  subscriptions,
  courseSubscriptionId,
  userSubscriptionId
) => {
  if (courseSubscriptionId === userSubscriptionId) {
    return true;
  }

  const courseSubscriptionName =
    subscriptions.find(
      (subscription) => subscription.id === courseSubscriptionId
    )?.name || "";

  const userSubscriptionName =
    subscriptions.find((subscription) => subscription.id === userSubscriptionId)
      ?.name || "";

  console.log("==========: courseSubscriptionName: ", courseSubscriptionName);
  console.log("==========: userSubscriptionName: ", userSubscriptionName);

  if (userSubscriptionName === "Premium") {
    return true;
  }

  if (userSubscriptionName === "Gold" && courseSubscriptionName !== "Premium") {
    return true;
  }

  if (
    userSubscriptionName === "Standard" &&
    (courseSubscriptionName === "Free" || courseSubscriptionName === "Standard")
  ) {
    return true;
  }

  if (userSubscriptionName === "Free" && courseSubscriptionName === "Free") {
    return true;
  }

  return false;
};
