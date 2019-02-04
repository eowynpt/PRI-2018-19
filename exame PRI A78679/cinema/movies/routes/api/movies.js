var express = require('express');
var router = express.Router();
var Movie = require('../../controllers/movies')

/* API listagem dos filmes */
router.get('/', function(req, res) {
        Movie.listar()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).send("Erro na listagem: " + erro))
});

// 1. lista de filmes apenas com os campos "title" e "year" ;
// 4. Devolve a lista de filmes cujo campo "genres" contem o valor "Action";
// 5. Devolve a lista de prémios cujo campo "genres" contenha o valor "Action" e o campo "year" com um valor superior a "AAAA";
router.get('/filmes', function (req, res) {
    if (req.query.genro && req.query.genro=='Action') {
        Movie.procuraGenero(req.query.genro)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).send("Erro na listagem: " + erro))
    }
    if (req.query.categoria && req.query.categoria=='Action' && req.query.data) {
        Movie.procuraCategoriaData(req.query.categoria, req.query.data)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).send("Erro na listagem: " + erro))
    }
    else{
        Movie.listarTitleYear()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).send("Erro na listagem: " + erro))
    }
});

//  2. Devolve a informação completa de um filme;
router.get('/filmes/:id', function (req, res) {
    Movie.procuraMovie(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send("Erro na listagem: " + erro))
});


// 3. Devolve a lista de generos, sem repetições
router.get('/generos', function (req, res) {
    Movie.listarGeneros()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send("Erro na listagem: " + erro))
});


// 6. Devolve uma lista ordenada alfabeticamente por nome dos atores.
router.get('/atores', function (req, res) {
    Movie.listarAtores()
        .then(dados => res.jsonp(dados[0].listaDeAtores))
        .catch(erro => res.status(500).send("Erro na listagem: " + erro))
});



module.exports = router;
