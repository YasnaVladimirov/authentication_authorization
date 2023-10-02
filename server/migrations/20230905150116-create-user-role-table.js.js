'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("UserRole", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users", 
          key: "id"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "roles", 
          key: "id"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('UserRole');
  }
};
