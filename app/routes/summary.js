const { getRegister, getEmail } = require('../session')
const ViewModel = require('./models/summary')

module.exports = {
  method: 'GET',
  path: '/summary',
  options: {
    handler: async (request, h) => {
      const email = getEmail(request)
      const registerDetails = getRegister(request)

      return h.view('summary', new ViewModel(email, registerDetails))
    }
  }
}
