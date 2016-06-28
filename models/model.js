'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new mongoose.Schema({
  name: String,
  playerID: Schema.Types.ObjectId,
  age: Number,
  height: String,
  dob: String,
  bmi: Number,
  number: Number,
  twitter: String,
  currentValue: String,
  picture: String,
  foot: String,
  position: String,
  currentClub: String,
  performanceScore: Number,
  totalAppearances: Number,
  totalGoalsScored: Number,
  shotAccuracy: String,
  avgPassAccuracy: String,
  avgPassLength: String,
  duelsWon: Number,
  totalChancesCreated: Number,
  defensiveActions: Number,
  performanceScoreByMatch: Schema.Types.Mixed,
  performanceScoreCumulative: Schema.Types.Mixed
});

const Player = mongoose.model('player', PlayerSchema);

module.exports = Player;
