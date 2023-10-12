const Joi = require('joi')
const { getDogPreference, setDogPreference } = require('../session/dog')
const ViewModel = require('./models/preference')

module.exports = [{
  method: 'GET',
  path: '/preference',
  options: {
    handler: async (request, h) => {
      const preference = getDogPreference(request)
      return h.view('preference', new ViewModel(preference))
    }
  }
},
{
  method: 'POST',
  path: '/preference',
  options: {
    validate: {
      payload: Joi.object({
        preference: Joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const preference = getDogPreference(request)
        return h.view('preference', new ViewModel(preference, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const preference = request.payload.preference
      setDogPreference(request, preference)
      return h.redirect('/summary')
    }
  }
}]
