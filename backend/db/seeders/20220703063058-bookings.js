'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Bookings', [
      {
        startDate: '2021-11-19',
        endDate: '2021-11-23',
        reviewId: 1,
        spotId: 1,
        userId: 6,
      },
      {
        startDate: '2021-12-19',
        endDate: '2021-12-23',
        reviewId: 2,
        spotId: 2,
        userId: 7,
      },
      {
        startDate: '2021-01-19',
        endDate: '2021-21-23',
        reviewId: 3,
        spotId: 3,
        userId: 8,
      },
      {
        startDate: '2021-02-19',
        endDate: '2021-02-23',
        reviewId: 4,
        spotId: 4,
        userId: 9,
      },
      {
        startDate: '2021-10-19',
        endDate: '2021-10-23',
        reviewId: 5,
        spotId: 5,
        userId: 10,
      },

  ], {});
  },
  
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
