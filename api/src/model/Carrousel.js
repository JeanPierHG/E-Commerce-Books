const { Schema, model } = require('mongoose')

const carrouselSchema = new Schema({
    image:{
        type: String
    }
})

module.exports = model('Carrousel', carrouselSchema)