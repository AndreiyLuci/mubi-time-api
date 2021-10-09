const mongoose = require("mongoose");

const favTVShowSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true
    },
    TVShowId: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
)

const FavTVShow = mongoose.model("FavTVShow", favTVShowSchema)

module.exports = FavTVShow