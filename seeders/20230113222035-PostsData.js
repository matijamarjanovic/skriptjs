'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Posts', [{
      userId: 1,
      topicId: 1,
      title: 'Svetsko Prventsvo',
      content: 'Sta mislite ko ce da osvoji svetsko prventsvo?',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts', null, {});

  }
};
