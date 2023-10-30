const Joi = require('joi')
const { owner } = require('../../../constants')
const { getAddressPostcode, setAddressPostcode } = require('../../../session/owner')
const ViewModel = require('../../../models/owner/postcode')

module.exports = [
  {
    method: 'GET',
    path: owner.routes.postcode,
    handler: (request, h) => {
      const postcode = getAddressPostcode(request)

      return h.view(owner.views.postcode, new ViewModel(postcode))
    }
  },
  {
    method: 'POST',
    path: owner.routes.postcode,
    options: {
      validate: {
        payload: Joi.object({
          postcode: Joi.string().required()
        }),
        failAction: async (request, h, error) => {
          const postcode = getAddressPostcode(request)
          return h.view(owner.views.postcode, new ViewModel(postcode, error)).code(400).takeover()
        }
      },
      handler: (request, h) => {
        const postcode = request.payload.postcode

        setAddressPostcode(request, { postcode })

        return h.redirect(owner.routes.selectAddress)
      }
    }
  }
]
