const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));

const googleApps = require('./playstore');

app.get('/apps', (req, res) => {
  const { genres, sort } = req.query;

  if (sort) {
    if (!['rating', 'app'].includes(sort)) {
      return res.status(400).send('Sort must be one of rating or app.');
    }
  }

  if (genres) {
    if (
      !['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(
        genres
      )
    ) {
      return res
        .status(400)
        .send(
          'Genre must be one of Action, Puzzle, Strategy, Casual, Arcade or Card.'
        );
    }
  }
  let genreResults = googleApps.filter((googleApp) => googleApp.Genre);

  let results = googleApps.filter((googleApp) => googleApp.App);

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }
  if (genres) {
    genreResults.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  return res.json(results).status(204);
});

module.exports = app;
