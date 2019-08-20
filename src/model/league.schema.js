const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leagueSchema = new Schema({
  leagueName: {
    type: String
  },
  price: {
    type: Number
  },
  leagueLocation: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  }
});

const Leagues = mongoose.model('league', leagueSchema);

module.exports = Leagues;
