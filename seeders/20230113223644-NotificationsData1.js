'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('Notifications', [{
        postId: 3,
        notifType: 'comment',
        content: 'Your post has a new comment',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    },
  
    async down (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Notifications', null, {});
  
    }
};
