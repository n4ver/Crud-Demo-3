'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('Todos', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true
      },
      title: Sequelize.DataTypes.STRING,
      isDone: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      content: Sequelize.DataTypes.STRING(500)
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('Todo');
  }
};
