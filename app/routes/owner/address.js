const Joi = require('joi')
const { owner } = require('../../constants')
const { getAddress, setAddress } = require('../../session/owner')
const ViewModel = require('../../models/owner/address')

module.exports = [{
  method: 'GET',
  path: owner.routes.address,
  options: {
    handler: async (request, h) => {
      const address = getAddress(request)
      return h.view(owner.views.address, new ViewModel(address))
    }
  }
},
{
  method: 'POST',
  path: owner.routes.address,
  options: {
    validate: {
      options: {
        abortEarly: false
      },
      payload: Joi.object({
        addressLine1: Joi.string().required(),
        addressLine2: Joi.string().allow(null).allow(''),
        town: Joi.string().required(),
        county: Joi.string().allow(null).allow(''),
        postcode: Joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const address = getAddress(request)
        return h.view(owner.views.address, new ViewModel(address, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      setAddress(request, request.payload)
      return h.redirect(owner.routes.dateOfBirth)
    }
  }
}]
