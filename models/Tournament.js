const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  player1: String,
  player2: String,
  winner: String,
});

const RoundSchema = new mongoose.Schema({
  matches: [MatchSchema],
});

const TournamentSchema = new mongoose.Schema({
  name: String,
  participants: [String],
  rounds: [RoundSchema], // 💡 new field
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tournament', TournamentSchema);

// node server.js 
// cd client 
// npm start 