const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/new', (req, res) => {
    const { serial, lat, lon, nome } = req.body;
    db.estacoes.create({ serial, lat, lon, nome })
    .then(newEstacao => res.send(newEstacao));
});

router.get('/index', (req, res) => {
    db.estacoes.findAll().then(estacao => res.send(estacao));
});

router.get('/find/:id', (req, res) => {
    db.estacoes.findOne({
        where: { id: req.params.id },
        include: db.dados
    }).then(estacao => res.send(estacao));
});

router.put('/update/:id', (req, res) => {
    const { serial, lat, lon, nome } = req.body;
    db.estacoes.update({ serial, lat, lon, nome },{
        where: {
            id: req.params.id
        }    
    }).then(estacao => res.send(estacao));
});

router.delete('/delete/:id', (req, res) => {
    db.estacoes.destroy({
        where: { id: req.params.id }
    }).then(res.send());
});

module.exports = router;