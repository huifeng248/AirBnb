'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.User, {foreignKey: 'userId'})
      Image.belongsTo(models.Spot, {foreignKey: 'spotId'})
      Image.belongsTo(models.Review, {foreignKey: 'reviewId'})
    }
  }
  Image.init({
    previewImage: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spotId: {
      type: DataTypes.INTEGER,
    },
    reviewId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Image',
    validate: {
      imageType() {
        if ((this.spotId && this.reviewId)||(!this.spotId && !this.reviewId)) {
          throw new Error ('Image type must be either spot or review')
        }
      }
    }
  });
  return Image;
};