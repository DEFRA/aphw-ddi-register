const Joi = require('joi')
const { dog } = require('../../constants')
const { getDogPreference, setDogPreference } = require('../../session/dog')
const ViewModel = require('../../models/dog/preference')

module.exports = [{
  method: 'GET',
  path: dog.routes.preference,
  options: {
    handler: async (request, h) => {
      const preference = getDogPreference(request)
      return h.view(dog.views.preference, new ViewModel(preference))
    }
  }
},
{
  method: 'POST',
  path: dog.routes.preference,
  options: {
    validate: {
      payload: Joi.object({
        preference: Joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const preference = getDogPreference(request)
        return h.view(dog.views.preference, new ViewModel(preference, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const preference = request.payload.preference
      setDogPreference(request, preference)
      return h.redirect(dog.routes.addAnother)
    }
  }
}]
