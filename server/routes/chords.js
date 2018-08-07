const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Chord = require('../models/Chords');
const passport = require('passport');
const ugs = require('ultimate-guitar-scraper')

router.get('/chordimage/:id', (req, res, next) => {
  const id = req.params.id.replace('___','♯');
  console.log(id)
  Chord.find({completeName: id})
    .then( chord => res.status(200).json(chord))
    .catch(e => next(e))
})

router.post('/', (req, res, next) => {
  const query = req.body.query ;
  const page = parseInt(req.body.page);
  ugs.search({
    query: query,
    page: page,
    type: ['Chords']
  }, (error, tabs) => {
    if (error) {
      res.status(404).json(error);
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
      res.status(200).json(suggestions);
    }
  })
})

router.post('/favourite', (req, res, next) => {
  const url = req.body.url
  const newFavourites = req.user.favourites;
  if(newFavourites.indexOf(url) == -1){
    newFavourites.push(url);
  }
  User.findByIdAndUpdate(req.user._id,{favourites: newFavourites})
  .then( user => {
    res.status(200).json(user);
  })
})

router.post('/delete', (req, res, next) => {
  const url = req.body.url
  const favourites = req.user.favourites;
  if (favourites.indexOf(url) > -1){
    favourites.splice(favourites.indexOf(url), 1);
  }
  User.findByIdAndUpdate(req.user._id,{favourites: favourites})
  .then( user => {
    console.log(user);
    res.status(200).json(user);
  })
  .catch( err => {
    console.log(err);
  })
})

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})


module.exports = router;
