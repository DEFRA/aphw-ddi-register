const Joi = require('joi')
const { getDogMicrochipped, setDogMicrochipped } = require('../session/dog')
const ViewModel = require('./models/microchipped')

module.exports = [{
  method: 'GET',
  path: '/microchipped',
  options: {
    handler: async (request, h) => {
      const microchipped = getDogMicrochipped(request)
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
        const microchipped = getDogMicrochipped(request)
        return h.view('microchipped', new ViewModel(microchipped, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const microchipped = request.payload.microchipped
      setDogMicrochipped(request, microchipped)

      if (microchipped === 'no') {
        return h.redirect('/preference')
      }

      return h.redirect('/microchip-number')
    }
  }
}]
