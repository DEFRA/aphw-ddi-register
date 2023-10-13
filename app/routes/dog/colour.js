const Joi = require('joi')
const { dog } = require('../../constants')
const { setDogColour, getDogColour } = require('../../session/dog')
const ViewModel = require('../../models/dog/colour')

module.exports = [{
  method: 'GET',
  path: dog.routes.colour,
  options: {
    handler: async (request, h) => {
      const name = getDogColour(request)
      return h.view(dog.views.colour, new ViewModel(name))
    }
  }
},
{
  method: 'POST',
  path: dog.routes.colour,
  options: {
    validate: {
      payload: Joi.object({
        colour: Joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const name = getDogColour(request)
        return h.view(dog.views.colour, new ViewModel(name, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const colour = request.payload.colour
      setDogColour(request, colour)
      return h.redirect(dog.routes.gender)
    }
  }
}]
