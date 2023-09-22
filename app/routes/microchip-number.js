const Joi = require('joi')
const { setRegisterMicrochipNumber, getRegisterMicrochipNumber } = require('../session')
const ViewModel = require('./models/microchip-number')

module.exports = [{
  method: 'GET',
  path: '/microchip-number',
  options: {
    handler: async (request, h) => {
      const microchipNumber = getRegisterMicrochipNumber(request)
      return h.view('microchip-number', new ViewModel(microchipNumber))
    }
  }
},
{
  method: 'POST',
  path: '/microchip-number',
  options: {
    validate: {
      payload: Joi.object({
        microchipNumber: Joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const microchipNumber = getRegisterMicrochipNumber(request)
        return h.view('microchip-number', new ViewModel(microchipNumber, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const microchipNumber = request.payload.microchipNumber
      setRegisterMicrochipNumber(request, microchipNumber)
      return h.redirect('/summary')
    }
  }
}]
