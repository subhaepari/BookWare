const express = require("express");
const { Sequelize } = require("sequelize");
const cors = require('cors');

const db = require('./models/db');

// Uncomment when you want to seed data
// const _GENRES = require("./models/seed/genres.json");
// const _AUTHORS = require("./models/seed/authors.json");
// const _BOOKS = require("./models/seed/books.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors()); 

const sequelize = db.sequelize;

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

//Sync models -  pass {force:true} for dropping and re-creating tables
sequelize
  .sync()
  .then(() => {
    console.log("Models synchronized successfully.");

          //  Uncomment to Seed data after sync

            // db.Genre.bulkCreate(_GENRES)
            //   .then(
            //     db.Author.bulkCreate(_AUTHORS).then(() => {
            //     db.Book.bulkCreate(_BOOKS).then((users) => {
            //         console.log("Success adding genres, authors and books");
            //       });
            //     })
            //   )
            //   .catch((error) => {
            //     console.log("Error seeding data: ", error);
            //   });

          })
          .catch((err) => {
            console.error("Error synchronizing models: ", err);
          });

// Import routes
const bookRoutes = require("./routes/route.book");
const authorRoutes = require("./routes/route.author");
const genreRoutes = require("./routes/route.genre");

app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/genres", genreRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


