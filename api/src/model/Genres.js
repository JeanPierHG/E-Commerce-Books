const { Schema, model } = require("mongoose");

const genreSchema = new Schema({
  genre: {
    type: String,
    required: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

module.exports = model("Genre", genreSchema);
