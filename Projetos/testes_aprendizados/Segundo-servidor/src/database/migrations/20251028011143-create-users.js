'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      }, 
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      passwword_hash: {
        allowNull: false,
        type: Sequelize.DATE
      },
      provider: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
    });

  },

  async down (queryInterface) {
     await queryInterface.dropTable('users');
  }
};
