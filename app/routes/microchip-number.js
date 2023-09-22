const { setRegisterMicrochipNumber, getRegisterMicrochipNumber } = require('../session')

module.exports = [{
  method: 'GET',
  path: '/microchip-number',
  options: {
    handler: async (request, h) => {
      const microchipNumber = getRegisterMicrochipNumber(request)
      return h.view('microchip-number', { microchipNumber })
    }
  }
},
{
  method: 'POST',
  path: '/microchip-number',
  options: {
    handler: async (request, h) => {
      const microchipNumber = request.payload.microchipNumber
      setRegisterMicrochipNumber(request, microchipNumber)
      return h.redirect('/summary')
    }
  }
}]
