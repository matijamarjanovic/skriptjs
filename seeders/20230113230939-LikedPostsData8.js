'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('LikedPosts', [{
        userId: 2,
        postId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    },
  
    async down (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('LikedPosts', null, {});
  
    }
};
