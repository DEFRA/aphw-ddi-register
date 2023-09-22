const { setRegisterAddress, getRegisterAddress } = require('../session')

module.exports = [{
  method: 'GET',
  path: '/address',
  options: {
    handler: async (request, h) => {
      const address = getRegisterAddress(request)
      return h.view('address', { address })
    }
  }
},
{
  method: 'POST',
  path: '/address',
  options: {
    handler: async (request, h) => {
      const address = request.payload.address
      setRegisterAddress(request, address)
      return h.redirect('/dog-breed')
    }
  }
}]
