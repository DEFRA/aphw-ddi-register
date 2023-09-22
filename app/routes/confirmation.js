const sendEmail = require('../notify')
const { getRegister, getEmail } = require('../session')
const createRegistrationNumber = require('../create-registration-number')

module.exports = {
  method: 'GET',
  path: '/confirmation',
  options: {
    handler: async (request, h) => {
      const email = getEmail(request)
      const registerDetails = getRegister(request)
      const registrationNumber = createRegistrationNumber()
      registerDetails.registrationNumber = registrationNumber
      await sendEmail(email, registerDetails)
      return h.view('confirmation', { registrationNumber })
    }
  }
}
