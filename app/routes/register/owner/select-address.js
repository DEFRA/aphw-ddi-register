const Joi = require('joi')
const { owner } = require('../../../constants')
const { getPostcodeAddresses } = require('../../../api/os-places')
const { getAddressPostcode, setAddress } = require('../../../session/owner')
const ViewModel = require('../../../models/owner/select-address')

module.exports = [
  {
    method: 'GET',
    path: owner.routes.selectAddress,
    handler: async (request, h) => {
      const postcode = getAddressPostcode(request)

      const addresses = await getPostcodeAddresses(postcode)

      request.yar.set('addresses', addresses)

      return h.view(owner.views.selectAddress, new ViewModel(postcode, addresses))
    }
  },
  {
    method: 'POST',
    path: owner.routes.selectAddress,
    options: {
      validate: {
        payload: Joi.object({
          address: Joi.number().min(0).required()
        }),
        failAction: async (request, h, error) => {
          const postcode = getAddressPostcode(request)
          const addresses = request.yar.get('addresses')

          return h.view(owner.views.selectAddress, new ViewModel(postcode, addresses, error)).code(400).takeover()
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

        setAddress(request, address)

        return h.redirect(owner.routes.address)
      }
    }
  }
]
