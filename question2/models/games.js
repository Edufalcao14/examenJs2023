/* eslint-disable no-unused-vars */
const path = require('node:path');
const escape = require('escape-html');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/questions.json');
const jsonDbPathUser = path.join(__dirname, '/../data/games.json');
const defaultQuestions = [];
const userDefaults = [
  {
    id: 1,
    user: 'Edu',
    score: 2,
    date: '17/07/2023',
  },
  {
    id: 2,
    user: 'Tom',
    score: 3,
    date: '17/07/2023',
  },
];
const mixArray = (array) => array.sort(() => Math.random() - 0.5);

function start(level) {
  let mixedQuestions = [];
  const returnQuestions = [];
  const questions = parse(jsonDbPath, defaultQuestions);
  mixedQuestions = mixArray(questions);

  if (level !== undefined) {
    const filteredQuestions = mixedQuestions.filter((question) => question.level.includes(level));

    for (let i = 0; i < 3; i += 1) {
      returnQuestions.push(filteredQuestions[getRandomInt(filteredQuestions.length)]);
    }
    return returnQuestions;
  }

  for (let i = 0; i < 3; i += 1) {
    returnQuestions.push(mixedQuestions[getRandomInt(mixedQuestions.length)]);
  }
  return returnQuestions;
}
function saveScoreUser(user, score) {
  const usersSCore = parse(jsonDbPathUser, userDefaults);
  const dernierId = usersSCore.length;
  const currentDate = new Date().toDateString();
  const newUserScore = {
    id: dernierId + 1,
    user,
    score,
    date: currentDate,
  };
  usersSCore.push(newUserScore);
  serialize(jsonDbPathUser, usersSCore);

  return newUserScore;
}

function getRandomInt(sizeArray) {
  return Math.floor(Math.random() * sizeArray);
}

module.exports = {
  start,
  saveScoreUser,
};
