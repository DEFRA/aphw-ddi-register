const joi = require('joi')
const config = require('../../config').govPay
const createPayment = require('../../api/payment/create.js')
const { getRegister, setRegisterPaymentId, setRegistrationId } = require('../../session/register.js')
const generateRegistrationId = require('../../create-registration-number.js')
const { register } = require('../../constants/index.js')

module.exports = [
  {
    method: 'GET',
    path: register.routes.payment,
    options: {
      handler: async (request, h) => {

        if (!config.paymentEnabled) {
          const registrationId = generateRegistrationId()
          setRegistrationId(request, registrationId)
          return h.redirect(register.routes.confirmation)
        }

        return h.view(register.views.payment)
      }
    }
  },
  {
    method: 'POST',
    path: register.routes.payment,
    options: {
      validate: {
        failAction: async (request, h, err) => {
          console.log(err)
          return h.response('Error').code(500)
        }
      },
      handler: async (request, h) => {
        const registerDetails = getRegister(request)
        const registrationId = generateRegistrationId()
        registerDetails.reference = registrationId
        const res = await createPayment(registerDetails)
        setRegisterPaymentId(request, res.payment_id)
        setRegistrationId(request, registrationId)
        return h.redirect(res._links.next_url.href, 301)
      }
    }
  }
]
