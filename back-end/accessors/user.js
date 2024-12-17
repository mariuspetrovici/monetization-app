const bcrypt = require("bcrypt");

const { User, Subscription, Package } = require("../models");

const userAccessors = {
  setFirstName(value) {
    this.setDataValue(
      "firstName",
      value.charAt(0).toUpperCase() + value.slice(1)
    );
  },

  setLastName(value) {
    this.setDataValue(
      "lastName",
      value.charAt(0).toUpperCase() + value.slice(1)
    );
  },

  setPassword(value) {
    const hashedPassword = bcrypt.hashSync(value, 10);
    this.setDataValue("password", hashedPassword);
  },

  // EAGER LOADING
  async getEagerUserWithSubscription(userId) {
    return await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Subscription,
          include: [Package],
          required: true, // required eager loading
        },
      ],
    });
  },

  // LAZY LOADING
  async getLazyUserWithSubscription(userId) {
    return await User.findOne({
      where: { id: userId },
    });
  },
};

module.exports = userAccessors;
