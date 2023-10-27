const sendEmail = require('../../notify')
const { getOwner } = require('../../session/owner')
const { getDog } = require('../../session/dog')
const { createRow } = require('../../storage')
const { owner } = require('../../constants')
const createRegistrationNumber = require('../../create-registration-number')

module.exports = {
  method: 'GET',
  path: owner.routes.confirmation,
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

      return h.view(owner.views.confirmation, {
        registrationNumber,
        email
      })
    }
  }
}
