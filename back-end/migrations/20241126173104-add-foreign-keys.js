"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "business"."Courses"
      ADD CONSTRAINT "fk_courses_subscriptionId"
      FOREIGN KEY ("subscriptionId") REFERENCES "business"."Subscriptions"("id")
      ON DELETE SET NULL
      ON UPDATE CASCADE;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "business"."Pages"
      ADD CONSTRAINT "fk_pages_courseId"
      FOREIGN KEY ("courseId") REFERENCES "business"."Courses"("id")
      ON DELETE SET NULL
      ON UPDATE CASCADE;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "business"."UsersSubscriptions"
      ADD CONSTRAINT "fk_usersSubscriptions_userId"
      FOREIGN KEY ("userId") REFERENCES "business"."Users"("id")
      ON DELETE SET NULL
      ON UPDATE CASCADE;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "business"."UsersSubscriptions"
      ADD CONSTRAINT "fk_usersSubscriptions_subscriptionId"
      FOREIGN KEY ("subscriptionId") REFERENCES "business"."Subscriptions"("id")
      ON DELETE SET NULL
      ON UPDATE CASCADE;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "business"."Courses"
      DROP CONSTRAINT "fk_courses_subscriptionId";
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "business"."Pages"
      DROP CONSTRAINT "fk_pages_courseId";
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "business"."UsersSubscriptions"
      DROP CONSTRAINT "fk_userSubscriptions_userId";
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "business"."UsersSubscriptions"
      DROP CONSTRAINT "fk_usersSubscriptions_subscriptionId";
    `);
  },
};
