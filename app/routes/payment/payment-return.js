const paymentDetails = require('../../api/payment-details')
const { getRegisterPaymentId } = require('../../session/register')
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
          return h.redirect(register.routes.paymentFailed)
        }

        return h.redirect(register.routes.paymentSuccessful)
      }
    }
  }
]
