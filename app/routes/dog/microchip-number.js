const Joi = require('joi')
const { dog } = require('../../constants')
const { getDogMicrochipNumber, setDogMicrochipNumber } = require('../../session/dog')
const ViewModel = require('../../models/dog/microchip-number')

module.exports = [{
  method: 'GET',
  path: dog.routes.microchipNumber,
  options: {
    handler: async (request, h) => {
      const microchipNumber = getDogMicrochipNumber(request)
      return h.view(dog.views.microchipNumber, new ViewModel(microchipNumber))
    }
  }
},
{
  method: 'POST',
  path: dog.routes.microchipNumber,
  options: {
    validate: {
      payload: Joi.object({
        microchipNumber: Joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const microchipNumber = getDogMicrochipNumber(request)
        return h.view(dog.views.microchipNumber, new ViewModel(microchipNumber, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const microchipNumber = request.payload.microchipNumber
      setDogMicrochipNumber(request, microchipNumber)
      return h.redirect(dog.routes.preference)
    }
  }
}]
