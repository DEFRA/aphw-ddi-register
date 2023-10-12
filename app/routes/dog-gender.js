const Joi = require('joi')
const { getDogGender, setDogGender } = require('../session/dog')
const ViewModel = require('./models/dog-gender')

module.exports = [{
  method: 'GET',
  path: '/dog-gender',
  options: {
    handler: async (request, h) => {
      const microchipped = getDogGender(request)
      return h.view('dog-gender', new ViewModel(microchipped))
    }
  }
},
{
  method: 'POST',
  path: '/dog-gender',
  options: {
    validate: {
      payload: Joi.object({
        gender: Joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const gender = getDogGender(request)
        return h.view('dog-gender', new ViewModel(gender, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const gender = request.payload.gender
      setDogGender(request, gender)
      return h.redirect('/microchipped')
    }
  }
}]
