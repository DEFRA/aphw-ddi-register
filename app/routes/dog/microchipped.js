const Joi = require('joi')
const { dog } = require('../../constants')
const { getDogMicrochipped, setDogMicrochipped } = require('../../session/dog')
const ViewModel = require('../../models/dog/microchipped')

module.exports = [{
  method: 'GET',
  path: dog.routes.microchipped,
  options: {
    handler: async (request, h) => {
      const microchipped = getDogMicrochipped(request)
      return h.view(dog.views.microchipped, new ViewModel(microchipped))
    }
  }
},
{
  method: 'POST',
  path: dog.routes.microchipped,
  options: {
    validate: {
      payload: Joi.object({
        microchipped: Joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const microchipped = getDogMicrochipped(request)
        return h.view(dog.views.microchipped, new ViewModel(microchipped, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const microchipped = request.payload.microchipped
      setDogMicrochipped(request, microchipped)

      if (microchipped === 'no') {
        return h.redirect(dog.routes.preference)
      }

      return h.redirect(dog.routes.microchipNumber)
    }
  }
}]
