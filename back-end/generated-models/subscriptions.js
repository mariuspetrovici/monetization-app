const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subscriptions', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    packageId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Packages',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM("active","inactive","expired"),
      allowNull: false
    },
    paid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    voucher: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    recurring: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'subscriptions',
    schema: 'business',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "subscriptions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
