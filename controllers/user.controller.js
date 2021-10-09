const User = require('../models/User.model');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUser).populate("favMovies").populate("favTVShow")
    .then((user) => res.json(user))
    .catch(next)
}

