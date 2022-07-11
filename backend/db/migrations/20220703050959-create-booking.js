'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      reviewId: {
        type: Sequelize.INTEGER,
        // references: { 
        //   model: 'Reviews',
        //   key:'id' 
        // },
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'Spots',
          key:'id' 
        },

      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'Users',
          key:'id' 
       },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};