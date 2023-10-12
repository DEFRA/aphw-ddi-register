const { getRegister } = require('../session/register')
const { getDog } = require('../session/dog')
const ViewModel = require('./models/summary')

module.exports = {
  method: 'GET',
  path: '/summary',
  options: {
    handler: async (request, h) => {
      const registerDetails = getRegister(request)
      const dog = getDog(request)

      return h.view('summary', new ViewModel(registerDetails, dog))
    }
  }
}
