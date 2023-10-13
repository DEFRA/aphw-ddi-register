const Joi = require('joi')
const { register, dog } = require('../../constants')
const { setEmail, getEmail } = require('../../session/register')
const ViewModel = require('../../models/register/email')

module.exports = [{
  method: 'GET',
  path: register.routes.email,
  options: {
    handler: async (request, h) => {
      const email = getEmail(request)
      return h.view(register.views.email, new ViewModel(email))
    }
  }
},
{
  method: 'POST',
  path: register.routes.email,
  options: {
    validate: {
      payload: Joi.object({
        email: Joi.string().email({ tlds: { allow: false } })
      }),
      failAction: async (request, h, error) => {
        const email = getEmail(request)
        return h.view(register.views.email, new ViewModel(email, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const email = request.payload.email
      setEmail(request, email)
      return h.redirect(dog.routes.name)
    }
  }
}]
