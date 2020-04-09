const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

// importa OngController
const OngController = require('./controllers/OngController')

const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

// importa rotas
const routes = express.Router()


routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  })
}), SessionController.create)

// Rota get - retorna todas as ongs
routes.get('/ongs', OngController.index)

/*
 * Query
 * Route
 * Body
 */


// Rota post - cria Ongs 
// Usando Joi e Celebrate para fazer as validações dos campos de recebimento.
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), OngController.create)

// Rota Mostra casos
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), IncidentController.index )

// Rota Cria Casos 
routes.post('/incidents', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  }),

  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),

}), IncidentController.create )

// Rota Apaga Casos
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), IncidentController.delete)

// Rota mostra ongs e casos
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index)

module.exports = routes