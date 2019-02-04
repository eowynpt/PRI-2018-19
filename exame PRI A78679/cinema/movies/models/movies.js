var mongoose = require('mongoose')
var Schema = mongoose.Schema

var MoviesSchema = new Schema({
    _id: {},
    title: {type: String},
    year: {type: Number},
    cast: {type: [String]},
    genres: {type: [String]},
})

// ...(nomeDoModelo, nomeDoSchema, nomeDaColeção)
module.exports = mongoose.model('Movie', MoviesSchema, 'movies')
