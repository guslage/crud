const db = require('../models');

module.exports = {
    async post(req, res){
        const { temperatura, velocidade_vento, umidade, data, estacaoId } = req.body;
        await db.dados.create({ temperatura, velocidade_vento, umidade, data, estacaoId })
        .then(post => res.send(post))
        .catch(err => res.send(err))
    },

    async index(req, res) { 
        await db.dados.findAll()
        .then(index => res.send(index))
        .catch(err => res.send(err))
    },

    async find(req, res) {
        await db.dados.findAll({ where: { id: req.params.id } })
        .then(find => res.send(find))
        .catch(err => res.send(err))
    },

    async update(req, res) {
        const { temperatura, velocidade_vento, umidade, data, estacaoId } = req.body;
        await db.dados.update({ temperatura, velocidade_vento, umidade, data, estacaoId }, { where: { id: req.params.id } })
        .then(update => res.send(update))
        .catch(err => res.send(err))
    },

    async delete(req, res) {
        await db.dados.destroy({ where: { id: req.params.id } })
        .then(res.send('ok'))
        .catch(res.send())
    }
}