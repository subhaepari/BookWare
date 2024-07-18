'use strict';


//Import models
const BookModel = require("./book");
const AuthorModel = require("./author");
const GenreModel = require("./genre");
const Sequelize = require('sequelize');

const db = {};

const sequelize = new Sequelize("bookstore", "root", "mysql@123", {
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: false,
  },
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Author = AuthorModel(sequelize);
db.Genre = GenreModel(sequelize);
db.Book = BookModel(sequelize);

db.Book.belongsTo(db.Author, { as: "authorRef", foreignKey: "author_id" }); // puts foreignKey author_id in Book table
db.Book.belongsTo(db.Genre, { as: "genreRef", foreignKey: "genre_id" }); // puts foreignKey genre_id in Book table


module.exports = db;
