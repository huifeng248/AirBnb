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
        description: 'Welcome to Eagle\'s Nest, one of the most ideally located Lakefront homes on Bass Lake!',
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
        description: 'VIlladeLago, The Lake House, is located in a secluded enclave in historic Cave Rock Nevada. Nestled in pines that sweep down through the riparian shrubbery from the home to the property’s private pier and buoy. ',
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
        description: 'Whether you want to relax by the water or get out and explore the lake, Villa De Lago makes it easy with a convenient dock, provided kayaks, and a furnished terrace with space for lounging and dining, plus a barbecue. After the sun sets over the mountains on the other side of the lake, gather around the pool table, flip on the streaming TV or share holiday photos via Wi-Fi.',
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
        description: 'Not 1 but 4 hot tubs peer over Lake Tahoe at this massive retreat with 300 feet of shore on Meeks Bay. This villa is packed with character—from a work-of-art chandelier over the 14-top dining set to hanging oars and a kitchen island reminiscent of a surfboard.',
        price: 1000,
      },
      {
        ownerId: '5',
        address: '1996 Highland Drive',
        city: 'Kings Beach',
        state: 'CA',
        country: 'USA',
        lat: '39.2266',
        lng: '120.0121',
        name: 'Beachfront Tahoe Home with panoramic Views of Lake Tahoe',
        description: 'This is a beautiful beachfront, 3 bedroom cozy family cabin/home located in Marla Bay Zephyr Cove. The bonus room is only available in the Summer months as there is no heat in this room.',
        price: 500,
      },
  
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
