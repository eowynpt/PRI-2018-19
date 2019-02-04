var express = require('express');
var router = express.Router();
var axios = require('axios')

/* homepage do site */
router.get('/', function(req, res) {
    axios.get('http://clav-test.di.uminho.pt/api/classes/nivel/1')
        .then(lista => res.render('index', {listaDeProcessos: lista.data})) //render do pug index.pug
        .catch(erro => {
            console.log('Erro na listagem de processos: ' + erro)
            res.render('index')
        })
});


/* página de uma classe: processo + descendência? + relacionados? */
router.get('/classe/:codigo', function (req, res) {
    axios.get('http://clav-test.di.uminho.pt/api/classes/c' + req.params.codigo)
    .then(lista => {
        axios.get('http://clav-test.di.uminho.pt/api/classes/c' + req.params.codigo + '/descendencia')
        .then(lista2 => {
            axios.get('http://clav-test.di.uminho.pt/api/classes/c' + req.params.codigo + '/dono')
            .then(lista3 => res.render('pagClasseDesc', {
                infoClasse: lista.data[0],
                descendenciaClasse: lista2.data,
                donosClasse: lista3.data
            }))
            .catch(erro => {
                console.log('Erro na listagem de processos: ' + erro)
                res.render('pagClasseDesc')
            })
        })
        .catch(erro => {
            console.log('Erro na listagem de processos: ' + erro)
            res.render('pagClasseDesc')
        })
    })
    .catch(erro => {
        console.log('Erro na listagem de processos: ' + erro)
        res.render('pagClasseDesc')
    })
})
    





// NÃO APAGAR !!!!!
module.exports = router;
