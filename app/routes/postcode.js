const Joi = require('joi')
const { getRegisterAddressPostcode, setRegisterAddressPostcode } = require('../session/register')
const ViewModel = require('./models/postcode')

module.exports = [
  {
    method: 'GET',
    path: '/postcode',
    handler: (request, h) => {
      const postcode = getRegisterAddressPostcode(request)

      return h.view('postcode', new ViewModel(postcode))
    }
  },
  {
    method: 'POST',
    path: '/postcode',
    options: {
      validate: {
        payload: Joi.object({
          postcode: Joi.string().required()
        }),
        failAction: async (request, h, error) => {
          const postcode = getRegisterAddressPostcode(request)
          return h.view('postcode', new ViewModel(postcode, error)).code(400).takeover()
        }
      },
      handler: (request, h) => {
        const postcode = request.payload.postcode

        setRegisterAddressPostcode(request, { postcode })

        return h.redirect('/select-address')
      }
    }
  }
]
