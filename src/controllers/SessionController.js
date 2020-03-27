const connection = require('../database/connection')

module.exports = {
    async create(req, res) {
        // Recebe
        const { id } = req.body

        // Busca e monta a consulta no banco
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first()

        // Verifica e mostra     
        if(!ong) {
            return res.json({ error: 'No ONG found with this ID' })
        }

        return res.json(ong)

    }
}