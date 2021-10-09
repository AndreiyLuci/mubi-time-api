const mongoose = require("mongoose");

const favMoviesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true
    },
    movieId: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
)

const FavMovies = mongoose.model("FavMovies", favMoviesSchema)

module.exports = FavMovies