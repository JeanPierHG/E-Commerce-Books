const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  birth: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  biography: {
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

module.exports = model("Author", authorSchema);
