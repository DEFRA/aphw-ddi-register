const boom = require('@hapi/boom')
const Joi = require('joi')
const { sendLoginMagicLink } = require('../email/sendLoginMagicLink')

const hintText = 'We\'ll use this to send you a link to register'

module.exports = [{
  method: 'GET',
  path: '/login',
  options: {
    auth: {
      mode: 'try'
    },
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: async (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect(request.query?.next || '/name')
      }

      return h.view('login', { hintText })
    }
  }
},
{
  method: 'POST',
  path: '/login',
  options: {
    auth: {
      mode: 'try'
    },
    validate: {
      payload: Joi.object({
        email: Joi.string().email()
      }),
      failAction: async (request, h, error) => {
        return h.view('login', { ...request.payload, errorMessage: { text: error.details[0].message }, hintText }).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const { email } = request.payload

      const result = await sendLoginMagicLink(request, email)
      console.log('RESULT', result)

      if (!result) {
        return boom.internal()
      }

      return h.view('check-email', { activityText: 'The email includes a link to register. This link will expire in 15 minutes.', email })
    }
  }
}]
