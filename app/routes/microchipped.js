const Joi = require('joi')
const { setRegisterMicrochipped, getRegisterMicrochipped } = require('../session')
const ViewModel = require('./models/microchipped')

module.exports = [{
  method: 'GET',
  path: '/microchipped',
  options: {
    handler: async (request, h) => {
      const microchipped = getRegisterMicrochipped(request)
      return h.view('microchipped', new ViewModel(microchipped))
    }
  }
},
{
  method: 'POST',
  path: '/microchipped',
  options: {
    validate: {
      payload: Joi.object({
        microchipped: Joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const microchipped = getRegisterMicrochipped(request)
        return h.view('microchipped', new ViewModel(microchipped, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const microchipped = request.payload.microchipped
      setRegisterMicrochipped(request, microchipped)
      return h.redirect('/microchip-number')
    }
  }
}]
