const express = require("express");
const { Sequelize } = require("sequelize");
const cors = require('cors');

const db = require('./models/db');



//Import models
// const BookModel = require("./models/book");
// const AuthorModel = require("./models/author");
// const GenreModel = require("./models/genre");

const _GENRES = require("./models/seed/genres.json");
const _AUTHORS = require("./models/seed/authors.json");
const _BOOKS = require("./models/seed/books.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors()); 

// Initialize Sequelize
// const sequelize = new Sequelize("bookstore", "root", "mysql@123", {
//   host: "localhost",
//   dialect: "mysql",
//   define: {
//     freezeTableName: false,
//   },
// });

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

//Define models
// const Author = AuthorModel(sequelize);
// const Genre = GenreModel(sequelize);
// const Book = BookModel(sequelize);

// //Make associations
// //Book.belongsTo(Author, { as: 'authorRef', foreignKey: 'author_id' });     // puts foreignKey author_id in Book table
// Book.belongsTo(Author, { as: "authorRef", foreignKey: "author_id" }); // puts foreignKey author_id in Book table
// Book.belongsTo(Genre, { as: "genreRef", foreignKey: "genre_id" }); // puts foreignKey genre_id in Book table

// Author.hasMany(Book);
// Genre.hasMany(Book);

//Sync models -  pass {force:true} for dropping and re-creating tables
sequelize
  .sync()
  .then(() => {
    console.log("Models synchronized successfully.");

            //Uncomment to Seed data after sync

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
// const routes = require('./routes')
// app.use('/api', routes)

// app.get('/', (req, res) => {
//   res.send('Welcome to the Express-Sequelize demo!')
// })

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

app.get("/", (req, res) => {
  // Author.create({
  //   author_name: "Helen",
  //   biography: "Hellllllllooooooo",
  // })
  //   .then(

  // Genre.create({

  //   genre_name: 'Fantasy',

  // })
  Book.create({
    // book_id: 11,
    title: "Book2",
    author_id: 2,
    genre_id: 1,
    price: 99.99,
    publication_date: "2024-06-07 00:00:00",
  })
    // )
    .then((book) => {
      res.json(book);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

//   connection
//     .sync({
//       force: true,
//       logging: console.log
//     })
//     .then(() => {
//       User.create({
//         first: 'Joe',
//         last: 'Smith',
//         bio: 'New bio here'
//     })
//   })
//     .then(() => {
//       console.log('Connection to database established successfully.');
//     })
//     .catch(err => {
//       console.error('Unable to connect to the database:', err);
//   });

async function syncAndTest() {
  try {
    await sequelize.sync({ force: true }); // This will drop and recreate the tables
    console.log("Models synchronized successfully.");

    const user = await User.create({
      name: "John Doe",
      email: "john.doe@example.com",
    });
    console.log("User created:", user.toJSON());

    const post = await Post.create({
      title: "First Post",
      content: "This is my first post!",
      userId: user.id,
    });
    console.log("Post created:", post.toJSON());

    const posts = await User.findOne({ where: { id: user.id }, include: Post });
    console.log("User with posts:", JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error("Error syncing or testing models:", error);
  } finally {
    await sequelize.close();
  }
}



async function Test() {
  try {
    await sequelize.sync({ force: true }); // This will drop and recreate the tables
    console.log("Models synchronized successfully.");

    const author = await Author.create({
      author_name: "John Doe",
      biography: "A dummy name when no name",
    });
    console.log("Author created:", author.toJSON());

    const genre = await Genre.create({
      genre_name: "Fantasy",
    });
    console.log("Genre created:", genre.toJSON());

    const book1 = await Book.create({
      // book_id: 11,
      title: "Book1",
      author_id: 1,
      genre_id: 1,
      price: 199.99,
      publication_date: "2024-06-07 00:00:00",
    });
    console.log("Book created:", book1.toJSON());

    const book2 = await Book.create({
      // book_id: 11,
      title: "Book2",
      author_id: 1,
      genre_id: 1,
      price: 299.99,
      publication_date: "2024-06-07 00:00:00",
    });
    console.log("Book created:", book2.toJSON());

    const book = await Book.findByPk(book1.id, {
      include: [
        {
          model: Author,
          as: "authorRef",
        },
        {
          model: Genre,
          as: "genreRef",
        },
      ],
    });
    //const book = await Book.findOne({ where: { id: book1.id }, include: Author });
    console.log("Book with author", JSON.stringify(book, null, 2));

    //  const Books = await Author.findOne({ where: { id: author.id }, include: Book })

    //test after making association genre .hasmany
    // const books = await Genre.findOne({ where: { id: genre.id }, include: Book });
    // console.log("Books of a given genre", JSON.stringify(books, null, 2));

    // const authors = await Author.findOne({ where: { id: author.id }, include: Book });
    // console.log("Author with books", JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error("Error syncing or testing models:", error);
  } finally {
    await sequelize.close();
  }
}

app.get("/test", (req, res) => Test());

//syncAndTest()
