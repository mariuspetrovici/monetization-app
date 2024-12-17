module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Users",
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.literal("uuid_generate_v4()"),
          primaryKey: true,
        },
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        email: Sequelize.STRING,
        role: Sequelize.STRING,
        progress: Sequelize.JSONB,
        password: Sequelize.STRING,
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
    await queryInterface.dropTable("Users");
  },
};
