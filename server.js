const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Tournament = require('./models/Tournament');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/tournament_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function generateRounds(participants) {
  const shuffled = [...participants].sort(() => Math.random() - 0.5);
  const roundOne = [];

  for (let i = 0; i < shuffled.length; i += 2) {
    const p1 = shuffled[i];
    const p2 = shuffled[i + 1] || 'BYE';
    roundOne.push({ player1: p1, player2: p2, winner: null });
  }

  return [{ matches: roundOne }];
}

app.post('/api/tournament', async (req, res) => {
  const { name, participants } = req.body;
  const rounds = generateRounds(participants);

  const tournament = new Tournament({
    name,
    participants,
    rounds
  });

  await tournament.save();
  res.json(tournament);
});

app.get('/api/tournament/:id', async (req, res) => {
  const tournament = await Tournament.findById(req.params.id);
  res.json(tournament);
});

app.post('/api/tournament/:id/winner', async (req, res) => {
  const { roundIndex, matchIndex, winner } = req.body;
  const tournament = await Tournament.findById(req.params.id);

  const currentMatch = tournament.rounds[roundIndex].matches[matchIndex];
  if (!currentMatch.winner) {
    currentMatch.winner = winner;

    const currentRound = tournament.rounds[roundIndex];
    const allDecided = currentRound.matches.every(m => m.winner);

    if (allDecided) {
      const winners = currentRound.matches.map(m => m.winner);

      if (winners.length === 1) {
      
        tournament.champion = winners[0];
      } else {
        
        const nextRound = [];
        for (let i = 0; i < winners.length; i += 2) {
          const p1 = winners[i];
          const p2 = winners[i + 1] || 'BYE';
          nextRound.push({ player1: p1, player2: p2, winner: null });
        }
        tournament.rounds.push({ matches: nextRound });

      
        if (nextRound.length === 1) {
          const onlyMatch = nextRound[0];
          if (onlyMatch.player2 === 'BYE') {
            onlyMatch.winner = onlyMatch.player1;
            tournament.champion = onlyMatch.player1;
          }
        }
      }
    }

    await tournament.save();
  }

  res.json(tournament);
});


app.listen(5000, () => console.log('Server running on port 5000'));


// node server.js 
// cd client 
// npm start 
