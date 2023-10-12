const sendEmail = require('../notify')
const { getRegister } = require('../session/register')
const { getDog } = require('../session/dog')
const { createRow } = require('../storage')
const createRegistrationNumber = require('../create-registration-number')

module.exports = {
  method: 'GET',
  path: '/confirmation',
  options: {
    handler: async (request, h) => {
      const registerDetails = {
        register: getRegister(request),
        dog: getDog(request)
      }
      const registrationNumber = createRegistrationNumber()
      registerDetails.registrationNumber = registrationNumber
      await sendEmail(registerDetails.register.email, { registrationNumber })
      await createRow('XL Bully', registrationNumber, registerDetails)

      return h.view('confirmation', { registrationNumber })
    }
  }
}
