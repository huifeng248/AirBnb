'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
   await queryInterface.bulkInsert('Images', [
     {
       previewImage: true,
       url: 'https://a0.muscache.com/im/pictures/619ab404-7a6c-4425-a79c-9459b1c00b1b.jpg?im_w=1200',
       spotId: 1,
       userId: 1,
       reviewId: null,
      },
      {
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/0d3f5072-2236-4648-b03e-b2a7ebd2f5c7.jpg?im_w=1200',
        spotId: 2,
        userId: 2,
        reviewId: null,
       },
       {
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/2708cd2c-347a-43fb-94f5-92a6f44c40be.jpg?im_w=1200',
        spotId: null,
        userId: 7,
        reviewId: 2,
       },
       {
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/c94d3a1c-29da-477b-8638-7ee6ab23a099.jpg?im_w=720',
        spotId: null,
        userId: 9,
        reviewId: 4,
       },
       {
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/01ba3e76-8d5e-45ad-8ae4-9c984c30f4c5.jpg?im_w=720',
        spotId: 3,
        userId: 3,
        reviewId: null,
       },
  ], {});
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Images', null, {});
  }
};
