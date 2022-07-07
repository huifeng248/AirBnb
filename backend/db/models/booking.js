'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: 'userId'})
      Booking.belongsTo(models.Spot, {foreignKey: 'spotId'})

    }
  }
  Booking.init({
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reviewId: {
      type: DataTypes.INTEGER
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Booking',
    scopes: {
      owner() {
        const {User} = require('../models')
        return {
          include: [
            {
              model: User,
              attributes: ['id', 'firstName', 'lastName']
            }
          ],
          attributes:{
                    exclude: ['reviewId']
          },
        }
      },
      user:{
        attributes: {
          exclude: ['id','reviewId','userId','createdAt','updatedAt']
      }
      },
    }
  });
  return Booking;
};