const express = require('express')

// importa OngController
const OngController = require('./controllers/OngController')

const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

// importa rotas
const routes = express.Router()

// Rota get - retorna todas as ongs
routes.get('/ongs', OngController.index)

// Rota post - async - transforma a função em assíncrona
routes.post('/ongs', OngController.create)

// IncidentsController routes 
routes.get('/incidents', IncidentController.index )
routes.post('/incidents', IncidentController.create )
routes.delete('/incidents/:id', IncidentController.delete)

// ProfileController routes
routes.get('/profile', ProfileController.index)

//SessionController routes
routes.post('/sessions', SessionController.create)


module.exports = routes