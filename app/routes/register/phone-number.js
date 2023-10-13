const Joi = require('joi')
const { register } = require('../../constants')
const { getRegisterPhoneNumber, setRegisterPhoneNumber } = require('../../session/register')
const { isValidPhoneNumber } = require('libphonenumber-js')
const ViewModel = require('../../models/register/phone-number.js')

const validatePhone = (phone, helper) => {
  if (!isValidPhoneNumber(phone, 'GB')) {
    return helper.message('Enter a telephone number in the correct format.')
  }

  return phone
}

module.exports = [
  {
    method: 'GET',
    path: register.routes.phone,
    handler: (request, h) => {
      const phone = getRegisterPhoneNumber(request)

      return h.view(register.views.phone, new ViewModel(phone))
    }
  },
  {
    method: 'POST',
    path: register.routes.phone,
    options: {
      validate: {
        payload: Joi.object({
          phone: Joi.string().required().custom(validatePhone)
        }),
        failAction: async (request, h, error) => {
          const phone = getRegisterPhoneNumber(request)
          return h.view(register.views.phone, new ViewModel(phone, error)).code(400).takeover()
        }
      },
      handler: (request, h) => {
        const phone = request.payload.phone

        setRegisterPhoneNumber(request, phone)

        return h.redirect(register.routes.email)
      }
    }
  }
]
