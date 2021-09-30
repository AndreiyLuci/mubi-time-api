const User = require('../models/User.model');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUser)
    .then((user) => res.json(user))
    .catch(next)
}