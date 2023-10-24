'use strict';
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Todos', [{
      id: uuidv4(),
      title: 'Recruits damn lacking',
      isDone: false,
      content: 'An example of a complaint'
    },
    {
      id: uuidv4(),
      title: 'Make cup of coffee',
      isDone: false,
      content: 'Make a cup of coffee'
    },
    {
      id: uuidv4(),
      title: 'First Parade',
      isDone: true,
      content: 'First Parade @ OCBC Square 0800'
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Todos', null, {});
  }
};