require('dotenv').config();
const mongoose = require('mongoose');
const Chord = require('../models/Chords');

mongoose.connect(process.env.DBURL).then( () =>  console.log('connected to DB'));

const chord = {
        completeName: "B",
        rootNote: 'B',
        sufix: '',
        images: [
          '../../assets/img/B_0.gif',
          '../../assets/img/B_1.gif',
          '../../assets/img/B_2.gif',
          '../../assets/img/B_3.gif',
          '../../assets/img/B_4.gif'
        ]
    }

Chord.create(chord)
  .then(chord => {
      console.log(chord);
      mongoose.disconnect();
  })
  .catch(e => console.log(e));