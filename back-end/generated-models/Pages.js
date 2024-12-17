const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Pages', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Courses',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Pages',
    schema: 'business',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "Pages_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
