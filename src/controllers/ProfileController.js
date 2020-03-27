const connection = require('../database/connection')

module.exports = {
    async index(req, res) {
        // Recebe
        const ong_id = req.headers.authorization

        // Busca e monta
        const incidents = await connection('incidents')
        .where('ong_id', ong_id)
        .select('*')

        // Mostra resultado
        return res.json(incidents)
    }
}