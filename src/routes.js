const express = require('express')

// importa OngController
const OngController = require('./controllers/OngController')

const IncidentController = require('./controllers/IncidentController')

// importa rotas
const routes = express.Router()

// Rota get - retorna todas as ongs
routes.get('/ongs', OngController.index)

// Rota post - async - transforma a função em assíncrona
routes.post('/ongs', OngController.create)


routes.post('/incidents', IncidentController.create )

module.exports = routes