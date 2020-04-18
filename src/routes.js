const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

// importa OngController
const OngController = require('./controllers/OngController')

const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

// importa rotas
const routes = express.Router()

/**
 *** Exemplo básico de uma rota: ***
 * 
 * app.get('/', (req, res ) => {
 *	return res.send(' Hello World ')
 * })
 *
 *** ou retorna um json ***
 *
 * app.get('/', (req, res ) => {
 *  return res.json({
 * 	  evento: 'Semana Omnistack 11',
 *		aluno: 'Dimitri Marchetti'
 *  })
 * })
 * 
 * 
 *** Tipos de Parâmetros: ***
 * 
 *** Query Params: Parâmetros nomeados enviados na rota após '?' (filtros, paginação). A requisição tem q vir na url como users?name=Dimitri&idade=30
 *
 * const params = req.query
 * 
 * console.log(params)
 * 
 * app.get('/users', (req, res) => {
 *  return res.json({
 *    evento: 'Semana Omnistack 11',
 *    aluno: 'Dimitri Marchetti'    
 *  })
 * })
 * 
 *** Route Params: Parâmetros utilizados para identificar rotas (recursos)
 * 
 * const params = req.params
 * 
 * console.log(params)
 * 
 * app.get('/users/:id', (req, res) => {
 *  return res.json({
 *    evento: 'Semana Omnistack 11',
 *    aluno: 'Dimitri Marchetti'    
 *  })
 * })
 * 
 *** Request Body: Corpo da requisição, utilizado para alterar ou criar recursos.
 *
 * no topo da página:
 * app.use(express.json)
 * 
 * cons body = req.body
 * 
 * json no insomnia
 * 
 * console.log(body)
 * 
 * app.post('/users', (req, res) => {
 *  return res.json({
 *    evento: 'Semana Omnistack 11',
 *    aluno: 'Dimitri Marchetti'    
 *  })
 * })
 * 
 * */

routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  })
}), SessionController.create)

// Rota get - retorna todas as ongs
routes.get('/ongs', OngController.index)


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