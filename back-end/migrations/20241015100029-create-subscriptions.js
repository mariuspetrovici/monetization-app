module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Subscriptions",
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.literal("uuid_generate_v4()"),
          primaryKey: true,
        },
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        durationDays: Sequelize.DATE,
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
    await queryInterface.dropTable("Subscriptions");
  },
};
