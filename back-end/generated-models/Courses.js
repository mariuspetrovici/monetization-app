const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Courses', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pageNrBlockers: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    pages: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    packageId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Packages',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Courses',
    schema: 'business',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "Courses_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
