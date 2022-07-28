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
       imageableType: "Spot",
      },
      {
        previewImage: false,
        url: 'https://www.airbnb.com/rooms/39752700?adults=1&category_tag=Tag%3A8522&children=0&infants=0&search_mode=flex_destinations_search&check_in=2022-11-01&check_out=2022-11-08&federated_search_id=bc22a139-5ff5-453a-896a-bfd5e312858a&source_impression_id=p3_1658952578_CGNkz%2BdGB9334BK4&modal=PHOTO_TOUR_SCROLLABLE',
        spotId: 1,
        userId: 1,
        reviewId: null,
        imageableType: "Spot",
       },
       {
        previewImage: false,
        url: 'https://www.airbnb.com/rooms/39752700?adults=1&category_tag=Tag%3A8522&children=0&infants=0&search_mode=flex_destinations_search&check_in=2022-11-01&check_out=2022-11-08&federated_search_id=bc22a139-5ff5-453a-896a-bfd5e312858a&source_impression_id=p3_1658952578_CGNkz%2BdGB9334BK4&modal=PHOTO_TOUR_SCROLLABLE&modalItem=900218227',
        spotId: 1,
        userId: 1,
        reviewId: null,
        imageableType: "Spot",
       },
       {
        previewImage: false,
        url: 'https://www.airbnb.com/rooms/39752700?adults=1&category_tag=Tag%3A8522&children=0&infants=0&search_mode=flex_destinations_search&check_in=2022-11-01&check_out=2022-11-08&federated_search_id=bc22a139-5ff5-453a-896a-bfd5e312858a&source_impression_id=p3_1658952578_CGNkz%2BdGB9334BK4&modal=PHOTO_TOUR_SCROLLABLE&modalItem=900218243',
        spotId: 1,
        userId: 1,
        reviewId: null,
        imageableType: "Spot",
       },
       {
        previewImage: false,
        url: 'https://www.airbnb.com/rooms/39752700?adults=1&category_tag=Tag%3A8522&children=0&infants=0&search_mode=flex_destinations_search&check_in=2022-11-01&check_out=2022-11-08&federated_search_id=bc22a139-5ff5-453a-896a-bfd5e312858a&source_impression_id=p3_1658952578_CGNkz%2BdGB9334BK4&modal=PHOTO_TOUR_SCROLLABLE&modalItem=900218351',
        spotId: 1,
        userId: 1,
        reviewId: null,
        imageableType: "Spot",
       },
      {
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/0d3f5072-2236-4648-b03e-b2a7ebd2f5c7.jpg?im_w=1200',
        spotId: 2,
        userId: 2,
        reviewId: null,
        imageableType: "Spot",
       },
       {
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/2708cd2c-347a-43fb-94f5-92a6f44c40be.jpg?im_w=1200',
        spotId: null,
        userId: 7,
        reviewId: 2,
        imageableType: "Review",
       },
       {
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/c94d3a1c-29da-477b-8638-7ee6ab23a099.jpg?im_w=720',
        spotId: null,
        userId: 9,
        reviewId: 4,
        imageableType: "Review",
       },
       {
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/01ba3e76-8d5e-45ad-8ae4-9c984c30f4c5.jpg?im_w=720',
        spotId: 3,
        userId: 3,
        reviewId: null,
        imageableType: "Spot",
       },
  ], {});
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Images', null, {});
  }
};
