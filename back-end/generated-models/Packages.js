const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Packages', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM("free","standard","advanced","premium"),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Packages',
    schema: 'business',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "Packages_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
