const express = require('express');
const app = express();

let topMovies = [
    {
      title: 'Harry Potter and the Sorcerer\'s Stone',
      director: 'Chris Columbus'
    },
    {
      title: 'Lord of the Rings',
      director: 'Peter Jackson'
    },
    {
      title: 'Twilight',
      director: 'Catherine Hardwicke'
    }
  ];
  
  app.get('/', (req, res) => {
    res.send('Welcome to my movie club!');
  });
  
  app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });
  
  app.get('/movies', (req, res) => {
    res.json(topMovies);
  });
  
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });
  