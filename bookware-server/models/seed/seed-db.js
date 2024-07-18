"use strict";

const models = require("../db");
const _GENRES = require("./genres.json");
const _AUTHORS = require("./authors.json");
const _BOOKS = require("./books.json");

module.exports = {
  insert: () => {
    models.Genre.bulkCreate(_GENRES).then(
        models.Author.bulkCreate(_AUTHORS).then(() => {
          models.Book.bulkCreate(_BOOKS).then(() => {
            console.log("Success adding genres, authors and books");
          });
        })
      )
      .catch((error) => {
        console.log(error);
      });
  },
};
