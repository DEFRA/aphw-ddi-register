const Joi = require('joi')
const { register } = require('../../constants')
const { getPostcodeAddresses } = require('../../api/os-places')
const { getRegisterAddressPostcode, setRegisterAddress } = require('../../session/register')
const ViewModel = require('../../models/register/select-address')

module.exports = [
  {
    method: 'GET',
    path: register.routes.selectAddress,
    handler: async (request, h) => {
      const postcode = getRegisterAddressPostcode(request)

      const addresses = await getPostcodeAddresses(postcode)

      request.yar.set('addresses', addresses)

      return h.view(register.views.selectAddress, new ViewModel(postcode, addresses))
    }
  },
  {
    method: 'POST',
    path: register.routes.selectAddress,
    options: {
      validate: {
        payload: Joi.object({
          address: Joi.number().min(0).required()
        }),
        failAction: async (request, h, error) => {
          const postcode = getRegisterAddressPostcode(request)
          const addresses = request.yar.get('addresses')

          return h.view(register.views.selectAddress, new ViewModel(postcode, addresses, error)).code(400).takeover()
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

        return h.redirect(register.routes.address)
      }
    }
  }
]
