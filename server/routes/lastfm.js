const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Chord = require('../models/Chords');
const passport = require('passport');

router.get('/similar/:artist/:song', (req, res, next) => {
  const artist = req.params.artist;
  const song = req.params.song;
  
})

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})


module.exports = router;
