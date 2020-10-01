const db = require('../models');

module.exports = {
    async post(req, res){
        const { serial, lat, lon, nome } = req.body
        await db.estacoes.create({ serial, lat, lon, nome })
        .then(post => res.send(post))
        .catch(err => res.send(err))
    },

    async index(req, res) { 
        await db.estacoes.findAll()
        .then(index => res.send(index))
        .catch(err => res.send(err))
    },

    async find(req, res) {
        await db.estacoes.findOne({ where: { id: req.params.id }, include: db.dados })
        .then(find => res.send(find))
        .catch(err => res.send(err))
    },

    async update(req, res) {
        const { serial, lat, lon, nome } = req.body
        await db.estacoes.update({ serial, lat, lon, nome },{ where: { id: req.params.id }})
        .then(update => res.send(update))
        .catch(err => res.send(err))
    },

    async delete(req, res) {
        await db.estacoes.destroy({ where: { id: req.params.id } })
        .then(await db.dados.destroy({where: {estacaoId: req.params.id}}))
        .then(res.send('ok'))
        .catch(err => res.send(err))
    },

    async deleteData(req, res){
        await db.dados.destroy({where: {estacaoId: req.params.id}})
        .then(res.send('ok'))
        .catch(err => res.send(err))
    }
}