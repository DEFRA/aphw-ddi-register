const Joi = require('joi')
const { getDogMicrochipNumber, setDogMicrochipNumber } = require('../session/dog')
const ViewModel = require('./models/microchip-number')

module.exports = [{
  method: 'GET',
  path: '/microchip-number',
  options: {
    handler: async (request, h) => {
      const microchipNumber = getDogMicrochipNumber(request)
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
        const microchipNumber = getDogMicrochipNumber(request)
        return h.view('microchip-number', new ViewModel(microchipNumber, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const microchipNumber = request.payload.microchipNumber
      setDogMicrochipNumber(request, microchipNumber)
      return h.redirect('/summary')
    }
  }
}]
