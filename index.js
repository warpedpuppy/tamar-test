
const express = require('express');
const morgan = require('morgan');
const app = express();

const bodyParser = require('body-parser'),
methodOverride = require('method-override');

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

app.use(express.static('public'));
app.use(morgan('common'));

app.get('/', (req, res) => {
   res.send('Welcome to myFlix!');
});
      
app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});
      
app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops, something broke! Please try again later.');
});

app.listen(8080, () => {
    console.log('Your app is running on port 8080.');
      });