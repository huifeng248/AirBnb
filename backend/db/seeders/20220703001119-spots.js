'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: '1',
        address: '39124 Lake Drive 93604',
        city: 'Bass Lake',
        state: 'CA',
        country: 'USA',
        lat: '39.31707300',
        lng: '119.55604800',
        name: 'Eagles Nest at Bass Lake near Yosemite',
        description: 'This is a beautiful beachfront, 3 bedroom cozy family cabin/home located in Marla Bay Zephyr Cove. The bonus room is only available in the Summer months as there is no heat in this room.Breathtaking views of Lake Tahoe from the living room!',
        price: 300,
        previewImage: 'https://a0.muscache.com/im/pictures/619ab404-7a6c-4425-a79c-9459b1c00b1b.jpg?im_w=1200',

      },
      {
        ownerId: '2',
        address: '5461 Rosen Drive',
        city: 'Glenbrook',
        state: 'Nevada',
        country: 'USA',
        lat: '39.564667',
        lng: '119.586254',
        name: 'Villa De Lago The Lake House, Dock and Buoy',
        description: 'This is a beautiful beachfront, 3 bedroom cozy family cabin/home located in Marla Bay Zephyr Cove. The bonus room is only available in the Summer months as there is no heat in this room.Breathtaking views of Lake Tahoe from the living room!',
        price: 350,
        previewImage:'https://a0.muscache.com/im/pictures/0d3f5072-2236-4648-b03e-b2a7ebd2f5c7.jpg?im_w=1200',

      },
      {
        ownerId: '3',
        address: '1917 Goldenstar Place',
        city: 'Glenbrook',
        state: 'Nevada',
        country: 'USA',
        lat: '39.324667',
        lng: '119.666254',
        name: 'Modern double-height villa with private dock',
        description: 'This is a beautiful beachfront, 3 bedroom cozy family cabin/home located in Marla Bay Zephyr Cove. The bonus room is only available in the Summer months as there is no heat in this room.Breathtaking views of Lake Tahoe from the living room!',
        price: 550,
        previewImage: 'https://a0.muscache.com/im/pictures/01ba3e76-8d5e-45ad-8ae4-9c984c30f4c5.jpg?im_w=720',

      },
      {
        ownerId: '4',
        address: '1118 Monkey Road',
        city: 'Olympic Valley',
        state: 'California',
        country: 'USA',
        lat: '39.1970',
        lng: '120.2357',
        name: 'Amenities-packed chalet on Meeks Bay',
        description: 'This is a beautiful beachfront, 3 bedroom cozy family cabin/home located in Marla Bay Zephyr Cove. The bonus room is only available in the Summer months as there is no heat in this room.Breathtaking views of Lake Tahoe from the living room!',
        price: 1000,
        previewImage: 'https://a0.muscache.com/im/pictures/619ab404-7a6c-4425-a79c-9459b1c00b1b.jpg?im_w=1200'
      },
      {
        ownerId: '5',
        address: '1996 Highland Drive',
        city: 'Kings Beach',
        state: 'CA',
        country: 'USA',
        lat: '39.2266',
        lng: '120.0121',
        name: 'Beachfront Tahoe Home with panoramic Views',
        description: 'This is a beautiful beachfront, 3 bedroom cozy family cabin/home located in Marla Bay Zephyr Cove. The bonus room is only available in the Summer months as there is no heat in this room.Breathtaking views of Lake Tahoe from the living room!',
        price: 500,
        previewImage:'https://a0.muscache.com/im/pictures/1aecca1c-6e9a-494e-9547-379bd70f9fa6.jpg?im_w=1440'
      },
      {
        ownerId: '1',
        address: '2096 Highland Drive',
        city: 'Kings Beach',
        state: 'UT',
        country: 'USA',
        lat: '40.2266',
        lng: '120.0121',
        name: 'Beachfront Tahoe Home with panoramic Views',
        description: 'This is a beautiful beachfront, 3 bedroom cozy family cabin/home located in Marla Bay Zephyr Cove. The bonus room is only available in the Summer months as there is no heat in this room.Breathtaking views of Lake Tahoe from the living room!',
        price: 500,
        previewImage: 'https://a0.muscache.com/im/pictures/b7dacd61-f522-4707-a323-2f39e64b225c.jpg?im_w=1440'
      },
      {
        ownerId: '2',
        address: '1990 Highland Drive',
        city: 'Kings Beach',
        state: 'CA',
        country: 'USA',
        lat: '39.2266',
        lng: '120.0121',
        name: 'Beachfront Tahoe Home with panoramic Views',
        description: 'This is a beautiful beachfront, 3 bedroom cozy family cabin/home located in Marla Bay Zephyr Cove. The bonus room is only available in the Summer months as there is no heat in this room.Breathtaking views of Lake Tahoe from the living room!',
        price: 500,
        previewImage: 'https://a0.muscache.com/im/pictures/0d3f5072-2236-4648-b03e-b2a7ebd2f5c7.jpg?im_w=1200'
      },
      {
        ownerId: '3',
        address: '1990 Highland Drive',
        city: 'Kings Beach',
        state: 'CA',
        country: 'USA',
        lat: '39.2266',
        lng: '120.0121',
        name: 'Beachfront Tahoe Home with panoramic Views',
        description: 'This is a beautiful beachfront, 3 bedroom cozy family cabin/home located in Marla Bay Zephyr Cove. The bonus room is only available in the Summer months as there is no heat in this room.Breathtaking views of Lake Tahoe from the living room!',
        price: 500,
        previewImage: 'https://a0.muscache.com/im/pictures/8b49998c-569b-498d-8946-820a1a9f8633.jpg?im_w=1200'
      },
      {
        ownerId: '4',
        address: '1990 Highland Drive',
        city: 'Kings Beach',
        state: 'CA',
        country: 'USA',
        lat: '39.2266',
        lng: '120.0121',
        name: 'Beachfront Tahoe Home with panoramic Views',
        description: 'This is a beautiful beachfront, 3 bedroom cozy family cabin/home located in Marla Bay Zephyr Cove. The bonus room is only available in the Summer months as there is no heat in this room.Breathtaking views of Lake Tahoe from the living room!',
        price: 500,
        previewImage: 'https://a0.muscache.com/im/pictures/0b65a8c2-fb75-4d0e-a31f-48b87404a288.jpg?im_w=1440'
      },
      {
        ownerId: '5',
        address: '1990 Highland Drive',
        city: 'Kings Beach',
        state: 'CA',
        country: 'USA',
        lat: '39.2266',
        lng: '120.0121',
        name: 'Beachfront Tahoe Home with panoramic Views',
        description: 'This is a beautiful beachfront, 3 bedroom cozy family cabin/home located in Marla Bay Zephyr Cove. The bonus room is only available in the Summer months as there is no heat in this room.Breathtaking views of Lake Tahoe from the living room!',
        price: 500,
        previewImage: 'https://a0.muscache.com/im/pictures/01ba3e76-8d5e-45ad-8ae4-9c984c30f4c5.jpg?im_w=720'
      },
      {
        ownerId: '6',
        address: '1990 Highland Drive',
        city: 'Kings Beach',
        state: 'CA',
        country: 'USA',
        lat: '39.2266',
        lng: '120.0121',
        name: 'Beachfront Tahoe Home with panoramic Views',
        description: 'This is a beautiful beachfront, 3 bedroom cozy family cabin/home located in Marla Bay Zephyr Cove. The bonus room is only available in the Summer months as there is no heat in this room.Breathtaking views of Lake Tahoe from the living room!',
        price: 500,
        previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-16504440/original/4b853efe-c59f-431d-934b-ac874006dd61.jpeg?im_w=1440'
      },
      {
        ownerId: '7',
        address: '1990 Highland Drive',
        city: 'Kings Beach',
        state: 'CA',
        country: 'USA',
        lat: '39.2266',
        lng: '120.0121',
        name: 'Beachfront Tahoe Home with panoramic Views',
        description: 'This is a beautiful beachfront, 3 bedroom cozy family cabin/home located in Marla Bay Zephyr Cove. The bonus room is only available in the Summer months as there is no heat in this room.Breathtaking views of Lake Tahoe from the living room!',
        price: 500,
        previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-16504440/original/90998192-83d9-408d-80dd-20f07e11cc91.jpeg?im_w=1440'
      },
      {
        ownerId: '8',
        address: '1990 Highland Drive',
        city: 'Kings Beach',
        state: 'CA',
        country: 'USA',
        lat: '39.2266',
        lng: '120.0121',
        name: 'Beachfront Tahoe Home with panoramic Views',
        description: 'This is a beautiful beachfront, 3 bedroom cozy family cabin/home located in Marla Bay Zephyr Cove. The bonus room is only available in the Summer months as there is no heat in this room.Breathtaking views of Lake Tahoe from the living room!',
        price: 500,
        previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-16504440/original/e864b3c6-fe88-4857-833b-eabbbc0e424b.jpeg?im_w=1440'
      },
      {
        ownerId: '9',
        address: '1990 Highland Drive',
        city: 'Kings Beach',
        state: 'CA',
        country: 'USA',
        lat: '39.2266',
        lng: '120.0121',
        name: 'Beachfront Tahoe Home with panoramic Views',
        description: 'This is a beautiful beachfront, 3 bedroom cozy family cabin/home located in Marla Bay Zephyr Cove. The bonus room is only available in the Summer months as there is no heat in this room.Breathtaking views of Lake Tahoe from the living room!',
        price: 500,
        previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-16504440/original/f5a82b4c-c9b4-4e13-84d9-57c2e71b7156.jpeg?im_w=1440'
      },
      {
        ownerId: '10',
        address: '1990 Highland Drive',
        city: 'Kings Beach',
        state: 'CA',
        country: 'USA',
        lat: '39.2266',
        lng: '120.0121',
        name: 'Beachfront Tahoe Home with panoramic Views',
        description: 'This is a beautiful beachfront, 3 bedroom cozy family cabin/home located in Marla Bay Zephyr Cove. The bonus room is only available in the Summer months as there is no heat in this room.Breathtaking views of Lake Tahoe from the living room!',
        price: 500,
        previewImage: 'https://a0.muscache.com/im/pictures/de3427a6-7ff8-46ad-832e-71007b45da56.jpg?im_w=1200'
      },
      // {
      //   ownerId: '1',
      //   address: '1990 Highland Drive',
      //   city: 'Kings Beach',
      //   state: 'CA',
      //   country: 'USA',
      //   lat: '39.2266',
      //   lng: '120.0121',
      //   name: 'Beachfront Tahoe Home with panoramic Views of Lake Tahoe',
      //   description: 'This is a beautiful beachfront, 3 bedroom cozy family cabin/home located in Marla Bay Zephyr Cove.',
      //   price: 500,
      //   previewImage: 'https://a0.muscache.com/im/pictures/0d3f5072-2236-4648-b03e-b2a7ebd2f5c7.jpg?im_w=1200'
      // },
      
  
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
