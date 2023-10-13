const Joi = require('joi')
const { register } = require('../../constants')
const { setRegisterName, getRegisterName } = require('../../session/register')
const ViewModel = require('../../models/register/name')

module.exports = [{
  method: 'GET',
  path: register.routes.name,
  options: {
    handler: async (request, h) => {
      const name = getRegisterName(request)
      return h.view(register.views.name, new ViewModel(name))
    }
  }
},
{
  method: 'POST',
  path: register.routes.name,
  options: {
    validate: {
      payload: Joi.object({
        name: Joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const name = getRegisterName(request)
        return h.view(register.views.name, new ViewModel(name, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const name = request.payload.name
      setRegisterName(request, name)
      return h.redirect(register.routes.postcode)
    }
  }
}]
