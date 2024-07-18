const express = require('express')
const router = express.Router()
const { Genre } = require('../models/db')
//const { Genre } = require('../models/genre')

// GET all genres
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.findAll()
    res.json(genres)


// res.send("in find all genres")

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET a single genre by ID
router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id)
    if (genre) {
      res.json(genre)
    } else {
      res.status(404).json({ error: 'Genre not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// POST a new genre
router.post('/', async (req, res) => {
    try {
      const genre = await Genre.create(req.body)
      res.status(201).json(genre)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })
  
  // PUT update a genre by ID
  router.put('/:id', async (req, res) => {
    try {
      const [updated] = await Genre.update(req.body, {
        where: { id: req.params.id }
      })
      if (updated) {
        const updatedGenre = await Genre.findByPk(req.params.id)
        res.json(updatedGenre)
      } else {
        res.status(404).json({ error: 'Genre not found' })
      }
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })
  
  // DELETE a genre by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deleted = await Genre.destroy({
        where: { id: req.params.id }
      })
      if (deleted) {
        res.status(204).end()
      } else {
        res.status(404).json({ error: 'Genre not found' })
      }
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })
  

module.exports = router