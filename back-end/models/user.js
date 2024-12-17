const { UUIDV4 } = require("sequelize");

const userAccessors = require("../accessors/user");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        set: userAccessors.setFirstName,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        set: userAccessors.setLastName,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set: userAccessors.setPassword,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },
      progress: {
        type: DataTypes.JSONB,
        allowNull: true,
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
      timestamps: true,
      paranoid: false,
      tableName: "Users",
      schema: "business",
    }
  );

  return User;
};
