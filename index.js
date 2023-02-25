
const express = require('express');
const morgan = require('morgan');
const app = express();
const uuid = require('uuid');
const bodyParser = require('body-parser'),
methodOverride = require('method-override');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.urlencoded({
  extended: true
}));

let topMovies = [ 
  {    
      id: 1,
      name: 'Titanic',
      director: {
           name: 'James Cameron',
           birth: 1954
      },
      genre: {
         Name: 'Romance/Drama',
     },
  },
  { 
      id: 2,
      name: 'Harry Potter and the Prisoner of Azkaban',
      director: {
           name: 'Alfonso Cuaron',
           birth: 1961
      },
      genre: {
         name: 'Fantasy/Adventure'
      },
  },
  {
      id: 3,
      name: 'The Holiday',
      director: {
          name: 'Nancy Meyers',
          birth: 1949
      },
      genre: {
          name: 'Romance/Comedy'
      },
  },
  {
      id: 4,
      name: 'Home for Christmas',
      director: {
         name: 'Per-Olav Sorensen',
         birth: 1963
      },
      genre: {
         name: 'Comedy/drama '
      },
  },
  {
      id: 5,
      name: 'Home Alone',
      director: {
         name: 'Chris Columbus',
         birth: 1958
      },
      genre: {
         name: 'Comedy/Family'
      },
  },
  {
      id: 6,
      name: 'Roman Holiday',
      director: {
         name: 'William Wyler',
         birth: 1902
      },
      genre: {
         name: 'Romance/Comedy'
      },
  },
  {
      id: 7,
      name: 'Call me by your name',
      director: {
         name:'Luca Guadagnino',
         birth: 1971
      },
      genre: {
         name: 'Romance/Drama'
      },
  },
  {
      id: 8,
      name: 'Forrest Gump',
      director: {
         name:'Robert Zemeckis',
         birth: 1952
      },
      genre: {
        name: 'Romance, Drama'
      },
  },
  {
      id: 9,
      name: 'Brokeback Mountain',
      director: {
        name:'Ang Lee',
        birth: 1954
      },
      genre: {
        name: 'Romance/Drama'
      },
  },
  {
      id: 10,
      name: 'Carol',
      director: {
        name:'Todd Haynes',
        birth: 1961
      },
      genre: {
         name: 'Romance/Drama'
      },
  },
  ];

  let users = [
    {
      id: 1,
      name: 'Tamar',
      favMovies: 'Home for christmas',
    },
    {
      id: 2,
      name: 'Maggie',
      favMovies: [],
    },
  ];

app.get('/', (req, res) => {
   res.send('Welcome to myFlix!');
});
      
app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});
      
app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops, something broke! Please try again later.');
});

app.listen(8080, () => {
    console.log('Your app is running on port 8080.');
      });