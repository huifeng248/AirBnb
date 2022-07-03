'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [{
      email: 'demo@user.io',
      username: 'Demo-lition',
      firstName: 'Demo',
      lastName: 'Lition',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'user1@user.io',
      username: 'FakeUser1',
      firstName: 'Fakea',
      lastName: 'Usera',
      hashedPassword: bcrypt.hashSync('password2')
    },
    {
      email: 'user2@user.io',
      username: 'FakeUser2',
      firstName: 'Fakeb',
      lastName: 'Userb',
      hashedPassword: bcrypt.hashSync('password3')
    },
    {
      email: 'user3@user.io',
      username: 'FakeUser3',
      firstName: 'Fakec',
      lastName: 'Userc',
      hashedPassword: bcrypt.hashSync('password4')
    },
    {
      email: 'user4@user.io',
      username: 'FakeUser4',
      firstName: 'Faked',
      lastName: 'Userd',
      hashedPassword: bcrypt.hashSync('password5')
    },
    {
      email: 'user6@user.io',
      username: 'FakeUser6',
      firstName: 'Fakeaa',
      lastName: 'Customeraa',
      hashedPassword: bcrypt.hashSync('password6')
    },
    {
      email: 'user7@user.io',
      username: 'FakeUser7',
      firstName: 'Fakebb',
      lastName: 'Customerbb',
      hashedPassword: bcrypt.hashSync('password7')
    },
    {
      email: 'user8@user.io',
      username: 'FakeUser8',
      firstName: 'Fakecc',
      lastName: 'Customercc',
      hashedPassword: bcrypt.hashSync('password8')
    },
    {
      email: 'user9@user.io',
      username: 'FakeUser9',
      firstName: 'Fakedd',
      lastName: 'Customerdd',
      hashedPassword: bcrypt.hashSync('password9')
    },
    {
      email: 'user10@user.io',
      username: 'FakeUser10',
      firstName: 'Fakeee',
      lastName: 'Customeree',
      hashedPassword: bcrypt.hashSync('password10')
    },
  ], {});
  },
  
  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users', {
      username: {
        [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2']
      }
    }, {});
  }
};
