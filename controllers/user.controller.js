const User = require('../models/User.model');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUser)
    .then((user) => res.json(user))
    .catch(next)
};



module.exports.editUser = (req, res, next) => {

  if(req.file) {
    req.body.avatar = req.file.path;
  }
  console.log(req.body, 'IIIIIIIIIIIIIIIIIIIIIIIIIIII')
  
  User.findByIdAndUpdate(req.currentUser, req.body, {new: true})
  .then((user) => {
    res.json(user)
    })
    .catch(next)
}
