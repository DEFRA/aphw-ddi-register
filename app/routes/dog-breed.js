const Joi = require('joi')
const { setRegisterDogBreed, getRegisterDogBreed } = require('../session')
const ViewModel = require('./models/dog-breed')

module.exports = [{
  method: 'GET',
  path: '/dog-breed',
  options: {
    handler: async (request, h) => {
      const dogBreed = getRegisterDogBreed(request)
      return h.view('dog-breed', new ViewModel(dogBreed))
    }
  }
},
{
  method: 'POST',
  path: '/dog-breed',
  options: {
    validate: {
      payload: Joi.object({
        dogbreed: Joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const dogBreed = getRegisterDogBreed(request)
        return h.view('dog-breed', new ViewModel(dogBreed, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const dogBreed = request.payload.dogbreed
      setRegisterDogBreed(request, dogBreed)
      return h.redirect('/microchipped')
    }
  }
}]
