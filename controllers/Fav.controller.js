const FavMovie = require('../models/FavMovie.model');
const FavTVShow = require('../models/FavTVShow.model');

module.exports.getMovieFav = (req, res, next) => {
  // Search if there is a Movie Fav
  
    FavMovie.findOne({ movieId:req.params.id, user:req.currentUser})
  
    .then((fav) => {
      const faved = !!fav;

      res.json({fav: faved})
    })
    .catch(next)

}

module.exports.markMovieFav = (req, res, next) => {

  FavMovie.findOneAndDelete({user: req.currentUser, movieId: req.params.id})
    .then((fav) => {
      if(!fav) {
        return FavMovie.create({
          user: req.currentUser,
          movieId: req.params.id
        })
        .then(()=> res.json({fav: true}))
      } else {
        res.json({fav: false})
      }
    })
    .catch(next)

    User.findByIdandUpdate()
  
}

module.exports.getTVFav = (req, res, next) => {
  // Search if there is a Movie Fav
  
    FavTVShow.findOne({ TVShowId:req.params.id, user:req.currentUser})
  
    .then((fav) => {
      const faved = !!fav;

      res.json({fav: faved})
    })
    .catch(next)

}

module.exports.markTVFav = (req, res, next) => {

  FavTVShow.findOneAndDelete({user: req.currentUser, TVShowId: req.params.id})
    .then((fav) => {
      if(!fav) {
        return FavTVShow.create({
          user: req.currentUser,
          TVShowId: req.params.id
        })
        .then(()=> res.json({fav: true}))
      } else {
        res.json({fav: false})
      }
    })
    .catch(next)
  
}