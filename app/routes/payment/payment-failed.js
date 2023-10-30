const paymentDetails = require('../../api/payment-details')
const { getRegisterPaymentId } = require('../../session/register')
const { register } = require('../../constants')

module.exports = [
  {
    method: 'GET',
    path: register.routes.paymentFailed,
    options: {
      handler: async (request, h) => {
        const paymentId = getRegisterPaymentId(request)
        const payment = await paymentDetails(paymentId)

        return h.view(register.views.paymentFailed, { message: payment.state.message })
      }
    }
  }
]