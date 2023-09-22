const { setRegisterAddress, getRegisterAddress } = require('../session')

module.exports = [{
  method: 'GET',
  path: '/address',
  options: {
    handler: async (request, h) => {
      const addressLine1 = getRegisterAddress(request)
      return h.view('address', { addressLine1 })
    }
  }
},
{
  method: 'POST',
  path: '/address',
  options: {
    handler: async (request, h) => {
      const addressLine1 = request.payload.addressLine1
      setRegisterAddress(request, addressLine1)
      return h.redirect('/dog-breed')
    }
  }
}]
