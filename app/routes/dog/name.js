const Joi = require('joi')
const { dog } = require('../../constants')
const { setDogName, getDogName } = require('../../session/dog')
const ViewModel = require('../../models/dog/name')

module.exports = [{
  method: 'GET',
  path: dog.routes.name,
  options: {
    handler: async (request, h) => {
      const name = getDogName(request)
      return h.view(dog.views.name, new ViewModel(name))
    }
  }
},
{
  method: 'POST',
  path: dog.routes.name,
  options: {
    validate: {
      payload: Joi.object({
        name: Joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const name = getDogName(request)
        return h.view(dog.views.name, new ViewModel(name, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const name = request.payload.name
      setDogName(request, name)
      return h.redirect(dog.routes.dateOfBirth)
    }
  }
}]
