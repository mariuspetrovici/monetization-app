const { UUIDV4 } = require("sequelize");

// const courseAccessors = require("../accessors/course");

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pageNrBlockers: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      pages: {
        type: DataTypes.JSONB,
        allowNull: true,
        references: {
          model: {
            tableName: "Courses",
            schema: "business",
          },
          key: "id",
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // get: courseAccessors.getPrice,
        // set: courseAccessors.setPrice,
      },
      packageId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: {
            tableName: "Packages",
            schema: "business",
          },
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "expired"),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: true,
      paranoid: false,
      tableName: "Courses",
      schema: "business",
    }
  );

  return Course;
};
