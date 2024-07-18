'use strict';
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Genre = sequelize.define('Genre', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false, 
      validate: {
        notEmpty: true,
      }
   },
      genre_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
     }
  },

{timestamps: false
// underscore: true
}

);

  return Genre;
};
