const Joi = require('joi')
const { getRegisterPhoneNumber, setRegisterPhoneNumber } = require('../session')
const { isValidPhoneNumber } = require('libphonenumber-js')
const ViewModel = require('./models/phone.js')

const validatePhone = (phone, helper) => {
  if (!isValidPhoneNumber(phone, 'GB')) {
    return helper.message('Enter a telephone number in the correct format.')
  }

  return phone
}

module.exports = [
  {
    method: 'GET',
    path: '/phone',
    handler: (request, h) => {
      const phone = getRegisterPhoneNumber(request)

      return h.view('phone', new ViewModel(phone))
    }
  },
  {
    method: 'POST',
    path: '/phone',
    options: {
      validate: {
        payload: Joi.object({
          phone: Joi.string().required().custom(validatePhone)
        }),
        failAction: async (request, h, error) => {
          const phone = getRegisterPhoneNumber(request)
          return h.view('phone', new ViewModel(phone, error)).code(400).takeover()
        }
      },
      handler: (request, h) => {
        const phone = request.payload.phone

        setRegisterPhoneNumber(request, phone)

        return h.redirect('/')
      }
    }
  }
]
