const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Chord = require('../models/Chords');
const passport = require('passport');
const ugs = require('ultimate-guitar-scraper')

router.get('/chordimage/:id', (req, res, next) => {
  const id = req.params.id;
  Chord.find({completeName: id})
    .then( chord => res.status(200).json(chord))
    .catch(e => next(e))
})

router.post('/', (req, res, next) => {
  const query = req.body.query ;
  ugs.search({
    query: query,
    page: 1,
    type: ['Chords']
  }, (error, tabs) => {
    if (error) {
      console.log(error)
    } else {
      res.status(200).json(tabs);
    }
  })
})

router.post('/single', (req, res, next) => {
  const tabUrl = req.body.url
  ugs.get(tabUrl, (error, tab) => {
    if (error) {
      console.log(error)
    } else {
      res.status(200).json(tab);
    }
  })
})

router.post('/suggestions', (req, res, next) => {
  const query = req.body.query
  ugs.autocomplete(query, (error, suggestions) => {
    if (error) {
      console.log(error)
    } else {
      console.log(suggestions);
      res.status(200).json(suggestions);
    }
  })
})

router.post('/favourite', (req, res, next) => {
  const url = req.body.url
})

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
})


module.exports = router;
