const sendEmail = require('../../notify')
const { getOwner } = require('../../session/owner')
const { getDog } = require('../../session/dog')
const { createRow } = require('../../storage')
const { register } = require('../../constants')
const createRegistrationNumber = require('../../create-registration-number')

module.exports = {
  method: 'GET',
  path: register.routes.confirmation,
  options: {
    handler: async (request, h) => {
      const registerDetails = {
        register: getOwner(request),
        dog: getDog(request)
      }

      const registrationNumber = createRegistrationNumber()
      const email = registerDetails.register.email
      registerDetails.registrationNumber = registrationNumber
      await sendEmail(email, { registrationNumber })
      await createRow('XL Bully', registrationNumber, registerDetails)

      return h.view(register.views.confirmation, {
        registrationNumber,
        email
      })
    }
  }
}
