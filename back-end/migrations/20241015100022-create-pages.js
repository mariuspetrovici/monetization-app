module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Pages",
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.literal("uuid_generate_v4()"),
          primaryKey: true,
        },
        courseId: Sequelize.UUID,
        pageNr: Sequelize.INTEGER,
        body: Sequelize.TEXT,
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
    await queryInterface.dropTable("Pages");
  },
};
