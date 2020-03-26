// importa conexao com o banco de dados q está no arquivo connection
const connection = require('../database/connection')

// importa biblioteca para criar id criptografado
const crypto = require('crypto')

module.exports = {
    // método que retorna todas as ongs
    async index(req, res) {
        // SQL responsável por pegar os dados na tabela ongs  e jogar na variável ongs
        const ongs = await connection('ongs').select('*')

        return res.json(ongs)
    },

    // método q cadastra rotas
    async create(req, res) {

        // Recebe os dados pelo body da requisição
        const { name, email, whatsapp, city, uf } = req.body
    
        // cria id criptografado com 4 butes transformando em hexadecimal 
        const id = crypto.randomBytes(4).toString('HEX')
    
        // await - faz o node aguardar esse bloco de código finalizar para então continuar 
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
    
        return res.json({ id })
    }

}