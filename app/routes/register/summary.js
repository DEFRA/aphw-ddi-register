const { register } = require('../../constants')
const { getRegister } = require('../../session/register')
const { getDog } = require('../../session/dog')
const ViewModel = require('../../models/register/summary')

module.exports = {
  method: 'GET',
  path: register.routes.summary,
  options: {
    handler: async (request, h) => {
      const registerDetails = getRegister(request)
      const dog = getDog(request)

      return h.view(register.views.summary, new ViewModel(registerDetails, dog))
    }
  }
}
