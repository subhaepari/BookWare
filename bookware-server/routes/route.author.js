const express = require('express')
const router = express.Router()
const { Author } = require('../models/db')

// GET all authors
router.get('/', async (req, res) => {

  console.log("Got request for all books.");

  try {
    const authors = await Author.findAll()
    res.json(authors)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET a single author by ID
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id)
    if (author) {
      res.json(author)
    } else {
      res.status(404).json({ error: 'Author not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// POST a new author
router.post('/', async (req, res) => {
  console.log("Got request to create new author");
    try {
      const author = await Author.create(req.body)
      res.status(201).json(author)
      console.log(`Created new author successfully with id: ${author.id}`);
    } catch (err) {
      console.log(`Failed to create new author. Error: ${err.message}`);
      res.status(500).json({ error: err.message })
    }
  })
  
  // PUT update a author by ID
  router.put('/:id', async (req, res) => {
    console.log(`Got request to update author with id: ${req.params.id}`);
    try {
      const [updated] = await Author.update(req.body, {
        where: { id: req.params.id }
      })
      if (updated) {
        const updatedAuthor = await Author.findByPk(req.params.id)
        res.json(updatedAuthor)
        console.log(`Updated author successfully with id: ${updatedAuthor.id}`);
      } else {
        res.status(404).json({ error: 'Author not found' })
        console.log(`Failed to update author. Error: Author not found`);
      }
    } catch (err) {
      res.status(500).json({ error: err.message })
      console.log(`Failed to update author. Error: ${err.message}`);
    }
  })
  
  // DELETE a author by ID
  router.delete('/:id', async (req, res) => {
    console.log(`Got request to delete author with id: ${req.params.id}`);
    try {
      const deleted = await Author.destroy({
        where: { id: req.params.id }
      })
      if (deleted) {
        res.status(204).end()
      } else {
        res.status(404).json({ error: 'Author not found' })
        console.log(`Failed to delete author with id: ${req.params.id}. Error: Author not found`);
      }
    } catch (err) {
      res.status(500).json({ error: err.message })
      console.log(`Failed to delete author with id: ${req.params.id}. Error: ${err.message}`);

    }
  })
  

module.exports = router