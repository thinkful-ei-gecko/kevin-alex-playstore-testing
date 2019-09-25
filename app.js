const express = require('express');
const morgan = require('morgan');
const googleApps = require('./playstore');
const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
  const { genres, sort } = req.query;
  let results = googleApps;

  if (genres) {
    if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
      return res
        .status(400)
        .send(
          'Genre must be one of Action, Puzzle, Strategy, Casual, Arcade or Card.'
        );
    }
    results = googleApps.filter((googleApp) => googleApp.Genres.toLowerCase().includes(genres.toLowerCase()));
  }

  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res.status(400).send('Sort must be one of rating or app.');
    }
    results.sort((a, b) => a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0);
    return res.status(200).json(results);
  }
  
  if (genres) {
    results.sort((a, b) => a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0);
    return res.status(200).json(results);
  }

  return res.status(400).send('Must include a query!');
});

module.exports = app;
