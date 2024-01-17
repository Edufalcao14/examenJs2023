/* eslint-disable prefer-destructuring */
const express = require('express');
const { start, saveScoreUser } = require('../models/games');

const router = express.Router();

/* Starts the game
   GET 3 questions from the data base
   GET /pizzas?level = number 3 questions on this level
*/
router.get('/start', (req, res) => {
  const questions = start(req.query.level);

  return res.json(questions);
});

router.post('/', (req, res) => {
  const scoreParam = req?.body?.score ? req.body.score : undefined;
  const userParam = req?.body?.user ? req.body.user : undefined;

  if (userParam === undefined || scoreParam === undefined) {
    return res.status(400).json({ erreur: 'User or Score Undefined' });
  }

  if (scoreParam > 3 || scoreParam < 0) {
    return res.status(400).json({ erreur: 'Score Invalide.' });
  }
  const user = saveScoreUser(userParam, scoreParam);

  return res.json(user);
});
module.exports = router;
