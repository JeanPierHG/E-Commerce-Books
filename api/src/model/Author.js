const { Schema, model } = require('mongoose')

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
    default:
      'https://st.depositphotos.com/1898481/3660/i/600/depositphotos_36608939-stock-photo-unknown-person.jpg',
  },
  biography: {
    type: String,
    required: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Books',
    },
  ],
  isHidden: {
    type: Boolean,
    default: false,
  },
})

module.exports = model('Authors', authorSchema)
