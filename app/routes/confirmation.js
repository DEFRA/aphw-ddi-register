const config = require('../config').notify
const sendEmail = require('../email/notify')
const { getRegister, getEmail } = require('../session')
const { createRow } = require('../storage')
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
      await sendEmail(config.templateId, email, registerDetails)
      await createRow(registerDetails.dogBreed, registrationNumber, registerDetails)

      return h.view('confirmation', { registrationNumber })
    }
  }
}
