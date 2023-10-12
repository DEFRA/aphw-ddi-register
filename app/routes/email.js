const Joi = require('joi')
const { setEmail, getEmail } = require('../session/register')
const ViewModel = require('./models/email')

module.exports = [{
  method: 'GET',
  path: '/email',
  options: {
    handler: async (request, h) => {
      const email = getEmail(request)
      return h.view('email', new ViewModel(email))
    }
  }
},
{
  method: 'POST',
  path: '/email',
  options: {
    validate: {
      payload: Joi.object({
        email: Joi.string().email({ tlds: { allow: false } })
      }),
      failAction: async (request, h, error) => {
        const email = getEmail(request)
        return h.view('email', new ViewModel(email, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const email = request.payload.email
      setEmail(request, email)
      return h.redirect('/dog-name')
    }
  }
}]
