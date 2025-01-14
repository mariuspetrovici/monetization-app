module.exports = (sequelize, DataTypes) => {
  const UserSubscription = sequelize.define(
    "UserSubscription",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      subscriptionId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
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
      paranoid: false,
      timestamps: true,
      tableName: "UsersSubscriptions",
      schema: "business",
    }
  );

  return UserSubscription;
};
