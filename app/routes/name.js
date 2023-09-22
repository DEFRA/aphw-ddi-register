const Joi = require('joi')
const { setRegisterName, getRegisterName } = require('../session')
const ViewModel = require('./models/name')

module.exports = [{
  method: 'GET',
  path: '/name',
  options: {
    handler: async (request, h) => {
      const name = getRegisterName(request)
      console.log(name)
      return h.view('name', new ViewModel(name))
    }
  }
},
{
  method: 'POST',
  path: '/name',
  options: {
    validate: {
      payload: Joi.object({
        name: Joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const name = getRegisterName(request)
        return h.view('name', new ViewModel(name, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const name = request.payload.name
      setRegisterName(request, name)
      return h.redirect('/address')
    }
  }
}]
