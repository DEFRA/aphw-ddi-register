const Joi = require('joi')
const { register } = require('../../constants')
const { getRegisterAddressPostcode, setRegisterAddressPostcode } = require('../../session/register')
const ViewModel = require('../../models/register/postcode')

module.exports = [
  {
    method: 'GET',
    path: register.routes.postcode,
    handler: (request, h) => {
      const postcode = getRegisterAddressPostcode(request)

      return h.view(register.views.postcode, new ViewModel(postcode))
    }
  },
  {
    method: 'POST',
    path: register.routes.postcode,
    options: {
      validate: {
        payload: Joi.object({
          postcode: Joi.string().required()
        }),
        failAction: async (request, h, error) => {
          const postcode = getRegisterAddressPostcode(request)
          return h.view(register.views.postcode, new ViewModel(postcode, error)).code(400).takeover()
        }
      },
      handler: (request, h) => {
        const postcode = request.payload.postcode

        setRegisterAddressPostcode(request, { postcode })

        return h.redirect(register.routes.selectAddress)
      }
    }
  }
]
