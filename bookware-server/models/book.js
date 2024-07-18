'use strict';
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Book = sequelize.define('Book', {
     id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false 
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    publication_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    min_age: {
      type: DataTypes.INTEGER,
      
    },
    max_age: {
      type: DataTypes.INTEGER,
      
    },
    copies_available: {
      type: DataTypes.INTEGER,
    },
    back_orders: {
      type: DataTypes.INTEGER,
    },
    img_file_name: {
      type: DataTypes.STRING,
     
    },
    summary: {
      type: DataTypes.TEXT('long'),
     
    },

  },
{
  id: 'book_id',
  timestamps: false,
  // createdAt: false,
  // updatedAt: false,
 // underscore: true
}
);

  // Book.associate = function(models) {
  //   models.Book.belongsToMany(models.User, { as: 'Readers', through: 'ReadingList'});
  // };

  // Associations
  // Post.associate = models => {
  //   Post.belongsTo(models.User)
  // }

   //correct // Associations
  //  Book.associate = models => {
  //   Book.belongsTo(models.Author)
  // }


  return Book;
};



