
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

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Welcome to my book club!\n');
}).listen(8080);

console.log('My first Node test server is running on Port 8080.');