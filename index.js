
const express = require('express');
const app = express();

const http = require('http');

let topMovies = [ 
    {
        title: 'Titanic',
        director: 'James Cameron',
      },
      {
        title: 'Harry Potter and the Prisoner of Azkaban',
        director: 'Alfonso Cuaron',
      },
      {
        title: 'The Holiday',
        director: 'Nancy Meyers',
      },
      {
        title: 'Home for Christmas',
        director: 'Per-Olav Sorensen',
      },
      {
        title: 'Home Alone',
        director: 'Chris Columbus',
      },
      {
        title: 'Roman Holiday',
        director: 'William Wyler',
      },
      {
        title: 'Call me by your name',
        director: 'Luca Guadagnino',
      },
      {
        title: 'Forrest Gump',
        director: 'Robert Zemeckis',
      },
      {
        title: 'Brokeback Mountain',
        director: 'Ang Lee',
      },
      {
        title: 'Carol',
        director: 'Todd Haynes',
      },
    ];

    app.listen(8080, () => {
        console.log('Your app is running on port 8080.');
      });