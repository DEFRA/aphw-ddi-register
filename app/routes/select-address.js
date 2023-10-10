const Joi = require('joi')
const { getPostcodeAddresses } = require('../api/os-places')
const { getRegisterAddressPostcode, setRegisterAddress } = require('../session')
const ViewModel = require('./models/select-address')

module.exports = [
  {
    method: 'GET',
    path: '/select-address',
    handler: async (request, h) => {
      const postcode = getRegisterAddressPostcode(request)

      const addresses = await getPostcodeAddresses(postcode)

      request.yar.set('addresses', addresses)

      return h.view('select-address', new ViewModel(postcode, addresses))
    }
  },
  {
    method: 'POST',
    path: '/select-address',
    options: {
      validate: {
        payload: Joi.object({
          address: Joi.number().min(0).required()
        }),
        failAction: async (request, h, error) => {
          const postcode = getRegisterAddressPostcode(request)
          const addresses = request.yar.get('addresses')

          return h.view('select-address', new ViewModel(postcode, addresses, error)).code(400).takeover()
        }
      },
      handler: (request, h) => {
        const selectedAddress = request.yar.get('addresses')[request.payload.address]

        const address = {
          addressLine1: selectedAddress.addressLine1,
          addressLine2: selectedAddress.addressLine2,
          town: selectedAddress.addressTown,
          county: selectedAddress.addressCounty,
          postcode: selectedAddress.addressPostcode
        }

        setRegisterAddress(request, address)

        return h.redirect('/address')
      }
    }
  }
]
