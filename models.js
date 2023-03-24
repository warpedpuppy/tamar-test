const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
      Name: String,
      Description: String,
    },
    Director: {
      Name: String,
      Bio: String,
    },
    ImagePath: String,
    Featured: Boolean,
  });
  
  let userSchema = mongoose.Schema({
    UserName: {type: String, required: true},
    email: {type: String, required: true},
    Password: {type: String, required: true},
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    Birthday: Date,
  });
  
  let Movie = mongoose.model('Movie', movieSchema);
  let User = mongoose.model('User', userSchema);
  
  module.exports.Movie = Movie;
  module.exports.User = User;