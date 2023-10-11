const Joi = require('joi')
const { setRegisterAddress, getRegisterAddress } = require('../session')
const ViewModel = require('./models/address')

module.exports = [{
  method: 'GET',
  path: '/address',
  options: {
    handler: async (request, h) => {
      const addressLine1 = getRegisterAddress(request)
      return h.view('address', new ViewModel(addressLine1))
    }
  }
},
{
  method: 'POST',
  path: '/address',
  options: {
    validate: {
      payload: Joi.object({
        addressLine1: Joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const addressLine1 = getRegisterAddress(request)
        return h.view('address', new ViewModel(addressLine1, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const addressLine1 = request.payload.addressLine1
      setRegisterAddress(request, addressLine1)
      return h.redirect('/owner-dob')
    }
  }
}]
