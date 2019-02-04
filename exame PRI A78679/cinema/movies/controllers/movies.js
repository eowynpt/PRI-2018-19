var Movie = require('../models/movies')
Movies = module.exports
var mongoose = require('mongoose')

// Lista dos Filmes
Movies.listar = () => {
    return Movie
            .find()
            .exec()
}


// 1. Lista de filmes apenas com os campos "title" e "year";
Movies.listarTitleYear = () => {
    return Movie
        .find({}, {
            _id: 0,
            title: 1,
            year: 1
        })
        .exec()
}

// 2. Devolve a informação completa de um filme;
Movies.procuraMovie = id => {
    return Movie
        .findOne({_id: mongoose.Types.ObjectId(id)})
        .exec()
}


// 3. Devolve a lista de generos, sem repetições
Movies.listarGeneros = () => {
    return Movie
        .distinct("genres")
        .exec()
}

// 4. Devolve a lista de filmes cujo campo "genres" contem o valor "Action";
Movies.procuraGenero = (g) => {
    return Movie
        .find({genres: g})
        .exec()
}


// 5.  Devolve a lista de prémios cujo campo "genres" contenha o valor "Action" e o campo "year" com um valor superior a "AAAA";
Movies.procuraCategoriaData = (c, d) => {
    return Movie
        .find({genres: c, year: {$gte: d}})
        .exec()
}

// 6. Devolve uma lista ordenada alfabeticamente por nome dos atores.
Movies.listarAtores = () => {
    return Movie
        .aggregate([
            {$unwind: "$cast"},
            {$project: {
                    _id: 0,
                    title: 0,
                    year: 0,
                    genres: 0
                }
            },
            {$sort: {
                    cast: 1,
                },
            },
            {$group: {
                _id: 'atores',
                listaDeAtores: {
                    $push: '$cast'
                }
            }
            }
        ])
        .exec()
}