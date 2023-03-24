const express = require('express');
const morgan = require('morgan');
const app = express();
const uuid = require('uuid');
const bodyParser = require('body-parser'),
methodOverride = require('method-override');

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
   res.send('Welcome to myFlix!');
});

//return JSON object for movies
app.get('/Movies', (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//get movies by title
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('error: ' + err);
  });
});

//info about genre by genre name
app.get('/movies/genre/:genreName', (req,res) => {
  Movies.findOne({'Genre.Name':req.params.genreName })
  .then((movie) => {
      res.json(movie.Genre);
  })
  .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
  });
});

//info about directors by their name
app.get('/movies/director/:directorName', (req,res) => {
  Movies.findOne({ 'Director.Name': req.params.directorName})
  .then((movie) => {
      res.json(movie.Director);
  })
  .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
  });
});

// Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:UserName', (req, res) => {
  Users.findOne({ UserName: req.params.UserName })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//add a new user
app.post('/users', (req, res) => {
  Users.findOne({ UserName: req.body.UserName })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.UserName + 'already exists');
      } else {
        Users
          .create({
            UserName: req.body.UserName,
            Password: req.body.Password,
            email: req.body.email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Update a user's info, by username
app.put('/users/:UserName', (req, res) => {
  Users.findOneAndUpdate({ UserName: req.params.UserName }, { $set:
    {
      UserName: req.body.UserName,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, 
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//add a new movie to favs
app.post('/users/:UserName/movies/:MovieId', (req, res) => {
  Users.findOneAndUpdate({ UserName: req.params.UserName }, {
     $push: { FavoriteMovies: req.params.MovieId }
   },
   { new: true }, 
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//remove a movie from their list of favorites
app.delete('/users/:UserName/movies/:MovieId', (req, res) => {
  Users.findOneAndUpdate({ UserName: req.params.UserName }, {
     $pull: { FavoriteMovies: req.params.MovieId }
   },
   { new: true },
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
 });

// Delete a user by username
app.delete('/users/:UserName', (req, res) => {
  Users.findOneAndRemove({ UserName: req.params.UserName })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.UserName + ' was not found');
      } else {
        res.status(200).send(req.params.UserName + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
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