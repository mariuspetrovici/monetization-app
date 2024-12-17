module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "UsersSubscriptions",
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.literal("uuid_generate_v4()"),
          primaryKey: true,
        },
        userId: Sequelize.UUID,
        subscriptionId: Sequelize.UUID,
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        deletedAt: Sequelize.DATE,
      },
      {
        schema: "business",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("UsersSubscriptions");
  },
};
