const connection = require('../database/connection')

module.exports = {

    async index(req, res) {
        const { page = 1 } = req.query

        // Conta a quantas ocorrências tem no banco de dados
        const [count] = await connection('incidents').count()

        // Paginacao da tabela incidents
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
        ])

        res.header('X-Total-Count', count['count(*)'])    

        return res.json(incidents)
    },

    async create(req, res) {
        const { title, description, value } = req.body

        // recebe a autorização com id pelo header
        const ong_id = req.headers.authorization

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return res.json({ id })
    },

    async delete(req, res) {
        // Recebe id como parâmetro
        const { id } = req.params

        // recebe a autorização com id pelo header
        const ong_id = req.headers.authorization

        // busca e monta a variável incident com os dados do banco de dados
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

        if(incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Opeartion not permitted.' })
        }
        
        await connection('incidents').where('id', id).delete()

        return res.status(204).send()

    },
}