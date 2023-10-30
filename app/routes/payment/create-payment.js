const joi = require('joi')
const createPayment = require('../../api/create-payment')
const { getRegister, setRegisterPaymentId } = require('../../session/register')
const generateReference = require('../../create-registration-number')
const { register } = require('../../constants')
const schema = require('./schema/create-payment')

module.exports = [
  {
    method: 'GET',
    path: register.routes.payment,
    options: {
      handler: async (request, h) => {
        console.log(register.routes.paymentReturn)
        const registerDetails = {
          register: getRegister(request)
        }

        const applicant = {
          name: registerDetails?.register?.name,
          email: registerDetails?.register?.email
        }

        const payloadExample = {

        }

        return h.view(register.views.payment, { reference: generateReference(), applicant, payloadExample })
      }
    }
  },
  {
    method: 'POST',
    path: register.routes.payment,
    options: {
      validate: {
        payload: joi.object().concat(schema),
        failAction: async (request, h, err) => {
          console.log(err)
          return h.response('Error').code(500)
        }
      },
      handler: async (request, h) => {
        const payload = request.payload
        const res = await createPayment(payload)
        setRegisterPaymentId(request, res.payment_id)
        return h.redirect(res._links.next_url.href, 301)
      }
    }
  }
]
