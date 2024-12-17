const { Model, DataTypes } = require("sequelize");

class Page extends Model {
  static associate(models) {
    this.belongsTo(models.Course, { foreignKey: "courseId" });
  }
}

module.exports = (sequelize) => {
  Page.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      content: DataTypes.TEXT,
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Courses",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Page",
      tableName: "Pages",
      schema: "business",
      timestamps: true,
      paranoid: false,
    }
  );

  return Page;
};
