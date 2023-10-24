const sendEmail = require('../../notify')
const { getRegister } = require('../../session/register')
const { getDog } = require('../../session/dog')
const { createRow } = require('../../storage')
const { register } = require('../../constants')
const createRegistrationNumber = require('../../create-registration-number')

module.exports = {
  method: 'GET',
  path: register.routes.confirmation,
  options: {
    handler: async (request, h) => {
      const registerPayload = getRegister(request)

      const registerEntity = {
        ...registerPayload,
        ...registerPayload.address,
        dogs: JSON.stringify(getDog(request))
      }

      delete registerEntity.address

      const registrationNumber = createRegistrationNumber()
      const email = registerEntity.email
      registerEntity.registrationNumber = registrationNumber
      await sendEmail(email, { registrationNumber })
      await createRow('XL Bully', registrationNumber, registerEntity)

      return h.view(register.views.confirmation, {
        registrationNumber,
        email
      })
    }
  }
}
