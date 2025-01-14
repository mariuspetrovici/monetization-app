const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define(
    "Page",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: "Courses",
            schema: "business",
          },
          key: "id",
        },
      },
      pageNr: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      tableName: "Pages",
      schema: "business",
    }
  );

  return Page;
};
