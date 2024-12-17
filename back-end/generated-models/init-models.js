var DataTypes = require("sequelize").DataTypes;
var _Courses = require("./Courses");
var _Packages = require("./Packages");
var _Pages = require("./Pages");
var _SequelizeMeta = require("./SequelizeMeta");
var _Subscriptions = require("./Subscriptions");
var _Users = require("./Users");
var _subscriptions = require("./subscriptions");

function initModels(sequelize) {
  var Courses = _Courses(sequelize, DataTypes);
  var Packages = _Packages(sequelize, DataTypes);
  var Pages = _Pages(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var Subscriptions = _Subscriptions(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var subscriptions = _subscriptions(sequelize, DataTypes);

  Pages.belongsTo(Courses, { as: "course", foreignKey: "courseId"});
  Courses.hasMany(Pages, { as: "Pages", foreignKey: "courseId"});
  Courses.belongsTo(Packages, { as: "package", foreignKey: "packageId"});
  Packages.hasMany(Courses, { as: "Courses", foreignKey: "packageId"});
  Subscriptions.belongsTo(Packages, { as: "package", foreignKey: "packageId"});
  Packages.hasMany(Subscriptions, { as: "Subscriptions", foreignKey: "packageId"});
  Users.belongsTo(Packages, { as: "package", foreignKey: "packageId"});
  Packages.hasMany(Users, { as: "Users", foreignKey: "packageId"});
  subscriptions.belongsTo(Packages, { as: "package", foreignKey: "packageId"});
  Packages.hasMany(subscriptions, { as: "subscriptions", foreignKey: "packageId"});
  Users.belongsTo(Subscriptions, { as: "subscription", foreignKey: "subscriptionId"});
  Subscriptions.hasMany(Users, { as: "Users", foreignKey: "subscriptionId"});
  Subscriptions.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(Subscriptions, { as: "Subscriptions", foreignKey: "userId"});
  subscriptions.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(subscriptions, { as: "user_subscriptions", foreignKey: "userId"});

  return {
    Courses,
    Packages,
    Pages,
    SequelizeMeta,
    Subscriptions,
    Users,
    subscriptions,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
