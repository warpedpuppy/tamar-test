
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

let movies = [ 
  {    
      id: 1,
      title: 'Titanic',
      genre: {
        name: 'Romance',
        description: 'Genre description Romance',
      },
      director: {
           name: 'Cameron',
           birth: 1954,
      },
  },
  { 
      id: 2,
      title: 'Harry Potter and the Prisoner of Azkaban',
      genre: {
        name: 'Fantasy',
        description: 'Genre description Fantasy',
        },
        director: {
           name: 'Alfonso Cuaron',
           birth: 1961,
      },
  },
  {
      id: 3,
      title: 'The Holiday',
      genre: {
        name: 'Comedy',
        description: 'Genre description Comedy',
        },
      director: {
          name: 'Nancy Meyers',
          birth: 1949,
      },
  },
  {
      id: 4,
      title: 'Home for Christmas',
      genre: {
        name: 'Comedy',
        description: 'Genre description Comedy',
        },
      director: {
         name: 'Per-Olav Sorensen',
         birth: 1963,
      },
  },
  {
      id: 5,
      title: 'Home Alone',
      genre: {
        name: 'Family',
        description: 'Genre description Family',
      },
      director: {
         name: 'Chris Columbus',
         birth: 1958,
      },
  },
  {
      id: 6,
      title: 'Roman Holiday',
      genre: {
        name: 'Romance',
        description: 'Genre description Romance',
      },
      director: {
         name: 'William Wyler',
         birth: 1902,
      },
  },
  {
      id: 7,
      title: 'Call me by your name',
      genre: {
        name: 'Drama',
        description: 'Genre description Drama',
      },
      director: {
         name:'Luca Guadagnino',
         birth: 1971,
      },
  },
  {
      id: 8,
      title: 'Forrest Gump',
      genre: {
        name: 'Drama',
        description: 'Genre description Drama',
      },
      director: {
         name:'Robert Zemeckis',
         birth: 1952,
      },
  },
  {
      id: 9,
      title: 'Brokeback Mountain',
      genre: {
        name: 'Drama',
        description: 'Genre description Drama',
      },
      director: {
        name:'Ang Lee',
        birth: 1954,
      },
  },
  {
      id: 10,
      title: 'Carol',
      genre: {
        name: 'Drama',
        description: 'Genre description Drama',
      },
      director: {
        name:'Todd Haynes',
        birth: 1961
      },
  },
  ];

  let users = [
    {
      id: 1,
      name: 'Tamar',
      favoriteMovie: 'Home for christmas',
    },
    {
      id: 2,
      name: 'Maggie',
      favoriteMovie: [],
    },
  ];

app.get('/', (req, res) => {
   res.send('Welcome to myFlix!');
});

app.get('/Movies', (req, res) => {
  res.json(movies);
});

app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
    { return movie.title === req.params.title 
    }));
});

app.get('/genre/:genreName', (req, res) => {
	const { genreName } = req.params;
	const genre = movies.find((movie) => movie.genre.name === genreName).genre;

	if (genre) {
		res.status(200).json(genre);
	} else {
		res.status(404).send('Genre not in database');
	}
});

app.get('/director/:directorName', (req, res) => {
	const { directorName } = req.params;
	const director = movies.find((movie) => movie.director.name === directorName
	).director;

	if (director) {
		res.status(200).json(director);
	} else {
		res.status(404).send('Director not in database');
	}
});

app.post('/users', (req, res) => {
	const newUser = req.body;
  
	if (newUser.name) {
		newUser.id = uuid.v4();
		users.push(newUser);
		res.status(201).json(newUser);
	} else {
		res.status(400).send('New username must be filled out');
	}
});


app.put('/users/:id', (req, res) => {
	const { id } = req.params;
	const updatedUser = req.body;

	let user = users.find((user) => user.id == id);

	if (user) {
		user.name = updatedUser.name;
		res.status(200).json(user);
	} else {
		res.status(400).send('User not found');
	}
});

app.patch('/users/:id/movies/:MovieId', (req, res) => {
  const { id, MovieId} = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovie.push(MovieId);
    res.status(200).send(
      `Succesfully added to your favourites`
    );
  } else {
    res.status(400).send('User not found');
  }
});


app.delete('/users/:id/:movieName', (req, res) => {
  const { id, movieName } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieName
    );
    res.status(200).send(
      `Deleted from your Favorites`
    );
  } else {
    res.status(400).send('User not found');
  }
});

app.delete('/users/:id', (req, res) => {
  let user = users.find((user) => { return user.id === req.params.id });

  if (user) {
    user = users.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send('user ' + req.params.id + ' was deleted.');
  }
});
      
app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops, something broke! Please try again later.');
});

app.listen(8080, () => {
    console.log('Your app is running on port 8080.');
      });