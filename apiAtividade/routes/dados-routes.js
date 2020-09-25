const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/new', (req, res) => {
    const { temperatura, velocidade_vento, umidade, data, estacaoId } = req.body;
    db.dados.create({ temperatura, velocidade_vento, umidade, data, estacaoId })
    .then(newDado => res.send(newDado));
});

router.get('/index', (req, res) => {
    db.dados.findAll().then(dado => res.send(dado));
});

router.get('/findEstacao/:estacaoId', (req, res) => {
    db.dados.findAll({
        where: { estacaoId: req.params.estacaoId }
    }).then(dados => res.send(dados));
});

router.get('/find/:id', (req, res) => {
    db.dados.findAll({
        where: { id: req.params.id }
    }).then(dados => res.send(dados));
});

router.put('/update/:id', (req, res) => {
    const { temperatura, velocidade_vento, umidade, data, estacaoId } = req.body;
    db.dados.update({ temperatura, velocidade_vento, umidade, data, estacaoId }, {
        where: { id: req.params.id }
    }).then(dados => res.send(dados));
});

router.delete('/delete/:id', (req, res) => {
    db.dados.destroy({
        where: { id: req.params.id }
    }).then(res.send());
});

module.exports = router;