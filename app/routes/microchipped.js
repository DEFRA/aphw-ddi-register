const { setRegisterMicrochipped, getRegisterMicrochipped } = require('../session')

module.exports = [{
  method: 'GET',
  path: '/microchipped',
  options: {
    handler: async (request, h) => {
      const microchipped = getRegisterMicrochipped(request)
      return h.view('microchipped', { microchipped })
    }
  }
},
{
  method: 'POST',
  path: '/microchipped',
  options: {
    handler: async (request, h) => {
      const microchipped = request.payload.microchipped
      setRegisterMicrochipped(request, microchipped)
      return h.redirect('/microchip-number')
    }
  }
}]
