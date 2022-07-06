const { Schema, model } = require('mongoose')

const libroSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: Schema.Types.ObjectId,
    ref: 'Authors',
  },
  year: {
    type: Number,
  },
  pages: {
    type: Number,
    required: true,
  },
  editorial: {
    type: String,
  },
  cover: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  ratingUsers: { type: Array },
  stock: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 100,
  },
  genres: [
    {
      type: Schema.Types.String,
      ref: 'Genre',
    },
  ],
  review: {
    type: String,
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
  comments: [
    {
     type: Schema.Types.ObjectId,
     ref: 'Comments',
    },
  ]
})

module.exports = model('Books', libroSchema)
