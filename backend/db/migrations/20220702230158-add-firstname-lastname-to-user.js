'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.addColumn('Users', 
    'firstName', { 
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addColumn('Users', 
    'lastName', { 
      type: Sequelize.INTEGER,
      allowNull: false,
    });


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.removeColumn('Users', 'firstName');
    await queryInterface.removeColumn('Users', 'lastName');

  }
};
