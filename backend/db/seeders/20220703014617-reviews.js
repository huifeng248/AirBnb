'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  
   await queryInterface.bulkInsert('Reviews', [
     {
      name: 'Janelle',
      review: 'Michelle’s Airbnb is even more breathtaking in person. There is nothing more you can ask of out of the place. Stylish and comfortable interior with an amazing view and all the amenities you could possibly need.',
      stars: 5,
      spotId: 1,
      userId: 6,
    },
    {
      name: 'John',
      review: 'This view is better than the pictures. The beds are super comfortable, and my sister practically lived in the sauna.',
      stars: 4,
      spotId: 2,
      userId: 7,
    },
    {
      name: 'Megan',
      review: 'Wow! I stayed here for a few days in February, and it was truly amazing! The house is right on the water, and the view of Lake Tahoe is lovely. There is even a hot tub overlooking the lake. It was the perfect place to propose to my girlfriend!',
      stars: 4,
      spotId: 3,
      userId: 8,
    },
    {
      name: 'Chole',
      review: 'This is a gorgeous house. I would absolutely recommend it to my friend and I would love to come back as well!',
      stars: 4,
      spotId: 4,
      userId: 9,
    },
    {
      name: 'James',
      review:'So hard to rate a house like this when you absolutely loved ! It’s a memorable home to stay I don’t have a word to write a review over 10+ stars ',
      stars: 5,
      spotId: 5,
      userId: 10,
    },
    {
      name: 'Demo',
      review:'So hard to rate a house like this when you absolutely loved ! It’s a memorable home to stay I don’t have a word to write a review over 10+ stars ',
      stars: 5,
      spotId: 6,
      userId: 1,
    },
    {
      name: 'Demo',
      review:'So hard to rate a house like this when you absolutely loved ! It’s a memorable home to stay I don’t have a word to write a review over 10+ stars ',
      stars: 5,
      spotId: 4,
      userId: 1,
    },
    {
      name: 'John',
      review: 'This view is better than the pictures. The beds are super comfortable, and my sister practically lived in the sauna.',
      stars: 4,
      spotId: 2,
      userId: 3,
    },
    {
      name: 'John',
      review: 'This view is better than the pictures. The beds are super comfortable, and my sister practically lived in the sauna.',
      stars: 4,
      spotId: 3,
      userId: 4,
    },
    {
      name: 'Megan',
      review: 'Wow! I stayed here for a few days in February, and it was truly amazing! The house is right on the water, and the view of Lake Tahoe is lovely. There is even a hot tub overlooking the lake. It was the perfect place to propose to my girlfriend!',
      stars: 4,
      spotId: 5,
      userId: 6,
    },
    {
      name: 'Megan',
      review: 'Wow! I stayed here for a few days in February, and it was truly amazing! The house is right on the water, and the view of Lake Tahoe is lovely. There is even a hot tub overlooking the lake. It was the perfect place to propose to my girlfriend!',
      stars: 4,
      spotId: 7,
      userId: 8,
    },
    {
      name: 'Megan',
      review: 'Wow! I stayed here for a few days in February, and it was truly amazing! The house is right on the water, and the view of Lake Tahoe is lovely. There is even a hot tub overlooking the lake. It was the perfect place to propose to my girlfriend!',
      stars: 4,
      spotId: 9,
      userId: 10,
    },
    

  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
