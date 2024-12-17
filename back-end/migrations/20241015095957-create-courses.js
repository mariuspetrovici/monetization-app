module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Courses",
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.literal("uuid_generate_v4()"),
          primaryKey: true,
        },
        title: Sequelize.STRING,
        subscriptionId: Sequelize.UUID,
        status: Sequelize.STRING,
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
    await queryInterface.dropTable("Courses");
  },
};
