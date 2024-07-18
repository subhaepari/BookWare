'use strict';
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Author = sequelize.define('Author', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false, 
      validate: {
        notEmpty: true,
      }
   },
      author_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
     },
     biography: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
   },
   img_file_name: {
    type: DataTypes.STRING,
   
  },
  },

{timestamps: false,
// underscore: true
}

);

  return Author;
};
