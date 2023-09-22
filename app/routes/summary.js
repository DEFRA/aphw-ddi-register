const { getRegister } = require('../session')

module.exports = {
  method: 'GET',
  path: '/summary',
  options: {
    handler: async (request, h) => {
      const registerDetails = getRegister(request)
      console.log(registerDetails)
      return h.view('summary', { registerDetails })
    }
  }
}
