const { setRegisterDogBreed, getRegisterDogBreed } = require('../session')

module.exports = [{
  method: 'GET',
  path: '/dog-breed',
  options: {
    handler: async (request, h) => {
      const dogBreed = getRegisterDogBreed(request)
      return h.view('dog-breed', { dogBreed })
    }
  }
},
{
  method: 'POST',
  path: '/dog-breed',
  options: {
    handler: async (request, h) => {
      const dogBreed = request.payload.dogbreed
      setRegisterDogBreed(request, dogBreed)
      return h.redirect('/microchipped')
    }
  }
}]
