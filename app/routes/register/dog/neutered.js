const Joi = require('joi')
const { dog } = require('../../../constants')
const { getDogNeutered, setDogNeutered } = require('../../../session/dog')
const ViewModel = require('../../../models/dog/neutered')

module.exports = [{
  method: 'GET',
  path: dog.routes.neutered,
  options: {
    handler: async (request, h) => {
      const neutered = getDogNeutered(request)
      return h.view(dog.views.neutered, new ViewModel(neutered))
    }
  }
},
{
  method: 'POST',
  path: dog.routes.neutered,
  options: {
    validate: {
      payload: Joi.object({
        neutered: Joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const neutered = getDogNeutered(request)
        return h.view(dog.views.neutered, new ViewModel(neutered, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const neutered = request.payload.neutered
      setDogNeutered(request, neutered)
      return h.redirect(dog.routes.microchipped)
    }
  }
}]
