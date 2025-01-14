module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define(
    "Subscription",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      durationDays: DataTypes.INTEGER,
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
      tableName: "Subscriptions",
      schema: "business",
    }
  );

  return Subscription;
};
