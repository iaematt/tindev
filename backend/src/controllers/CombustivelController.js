const Combustivel = require('../models/Combustivel');

module.exports = {
    async store(req, res) {
        const { cliente, cidade, id_ticket, km_inicial, km_final, km_total, obs } = req.body;

        const combustivel = await Combustivel.create({
            cliente,
            cidade,
            id_ticket,
            km_inicial,
            km_final,
            km_total,
            obs
        });

        return res.json(combustivel);
    }
}