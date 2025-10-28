'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.addColumn('contact', "status", {      
      type: Sequelize.ENUM("ACTIVE", "ARCHIVED"),
      allowNull: false,
      defaultValue: "ACTIVE"
    });

  },

  async down (queryInterface) {
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.removeColumn('contact', 'status', {transaction});
      await queryInterface.sequelize.query("DROP TYPE enum_customers_status", transaction);
    })
  }
}
