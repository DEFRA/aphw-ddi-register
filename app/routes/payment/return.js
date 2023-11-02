const paymentDetails = require('../../api/payment/details')
const { getRegisterPaymentId, setRegistrationPaymentSucessful } = require('../../session/register')
const { register } = require('../../constants')
const { FAILED, CANCELLED, ERROR } = require('../../constants/payment-status')

module.exports = [
  {
    method: 'GET',
    path: register.routes.paymentReturn,
    options: {
      handler: async (request, h) => {
        const paymentId = getRegisterPaymentId(request)
        const payment = await paymentDetails(paymentId)
        const status = payment.state.status

        if (status === FAILED || status === CANCELLED || status === ERROR) {
          setRegistrationPaymentSucessful(request, false)
          return h.redirect(register.routes.paymentFailed)
        }

        setRegistrationPaymentSucessful(request, true)
        return h.redirect(register.routes.paymentSuccessful)
      }
    }
  }
]
