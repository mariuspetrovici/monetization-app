const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    subscriptionId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Subscriptions',
        key: 'id'
      }
    },
    packageId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Packages',
        key: 'id'
      }
    },
    progress: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Users',
    schema: 'business',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "Users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
