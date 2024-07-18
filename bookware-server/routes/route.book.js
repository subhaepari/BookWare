const express = require('express')
const router = express.Router()
const { Book, Author, Genre } = require('../models/db')

// GET all books
router.get('/', async (req, res) => {
  try {

    console.log("Got request for all books.");
    const books = await Book.findAll( {
      include: [
        {
          model: Author,
          as: "authorRef",
        },
        {
          model: Genre,
          as: "genreRef",
        },
      ]
    })
    res.json(books)


//res.send("in find all books")

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

//get all books by genre ∂
router.get('/bygenre/:id', async (req, res) => {
  try {

    //set include for author and genre details
    const books = await Book.findAll({where: {genre_id: req.params.id }})
    res.json(books)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET a single book by ID
router.get('/:id', async (req, res) => {
  try {
  
    const book = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Author,
          as: "authorRef",
        },
        {
          model: Genre,
          as: "genreRef",
        },
      ]
    })
    if (book) {
      res.json(book)
    } else {
      res.status(404).json({ error: 'Book not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// POST a new book
router.post('/', async (req, res) => {
  console.log("Got request to create new book");
    try {
      const book = await Book.create(req.body)

      const bookWithRefs = await Book.findByPk(book.id, {
        include: [
          {
            model: Author,
            as: "authorRef",
          },
          {
            model: Genre,
            as: "genreRef",
          },
        ]
      })

      //Return the book with references after creation
      res.status(201).json(bookWithRefs)
      console.log(`Created new book successfully with id: ${book.id}`);
      //console.log(`Created new book successfully with id: ${JSON.stringify(book)}`);
    } catch (err) {
      console.log(`Failed to create new book. Error: ${err.message}`);
      res.status(500).json({ error: err.message })
    }
  })
  
  // PUT update a book by ID
  router.put('/:id', async (req, res) => {
    console.log(`Got request to update book with id: ${req.params.id}`);
    try {
      const [updated] = await Book.update(req.body, {
        where: { id: req.params.id }
      })
      if (updated) {
    
       const updatedBook = await Book.findByPk(req.params.id, {
        include: [
          {
            model: Author,
            as: "authorRef",
          },
          {
            model: Genre,
            as: "genreRef",
          },
        ]
      })
        res.json(updatedBook)
        console.log(`Updated book successfully with id: ${updatedBook.id}`);
      } else {
        res.status(404).json({ error: 'Book not found' })
        console.log(`Failed to update book. Error: Book not found`);
      }
    } catch (err) {
      res.status(500).json({ error: err.message })
      console.log(`Failed to update book. Error: ${err.message}`);
    }
  })
  
  // DELETE a book by ID
  router.delete('/:id', async (req, res) => {
    console.log(`Got request to delete book with id: ${req.params.id}`);
    try {
      const deleted = await Book.destroy({
        where: { id: req.params.id }
      })
      if (deleted) {
        res.status(204).end()
      } else {
        res.status(404).json({ error: 'Book not found' })
        console.log(`Failed to delete book with id: ${req.params.id}. Error: Book not found`);
      }
    } catch (err) {
      res.status(500).json({ error: err.message })
      console.log(`Failed to delete book with id: ${req.params.id}. Error: ${err.message}`);
    }
  })
  

module.exports = router