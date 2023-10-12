const Joi = require('joi')
const { setRegisterAddress, getRegisterAddress } = require('../session')
const ViewModel = require('./models/address')

module.exports = [{
  method: 'GET',
  path: '/address',
  options: {
    handler: async (request, h) => {
      const address = getRegisterAddress(request)
      return h.view('address', new ViewModel(address))
    }
  }
},
{
  method: 'POST',
  path: '/address',
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
        const address = getRegisterAddress(request)
        return h.view('address', new ViewModel(address, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      setRegisterAddress(request, request.payload)
      return h.redirect('/owner-dob')
    }
  }
}]
