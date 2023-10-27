const Joi = require('joi')
const { owner } = require('../../constants')
const { getPhoneNumber, setPhoneNumber } = require('../../session/owner')
const { isValidPhoneNumber } = require('libphonenumber-js')
const ViewModel = require('../../models/owner/phone-number.js')

const validatePhone = (phone, helper) => {
  if (!isValidPhoneNumber(phone, 'GB')) {
    return helper.message('Enter a telephone number in the correct format.')
  }

  return phone
}

module.exports = [
  {
    method: 'GET',
    path: owner.routes.phone,
    handler: (request, h) => {
      const phone = getPhoneNumber(request)

      return h.view(owner.views.phone, new ViewModel(phone))
    }
  },
  {
    method: 'POST',
    path: owner.routes.phone,
    options: {
      validate: {
        payload: Joi.object({
          phone: Joi.string().required().custom(validatePhone)
        }),
        failAction: async (request, h, error) => {
          const phone = getPhoneNumber(request)
          return h.view(owner.views.phone, new ViewModel(phone, error)).code(400).takeover()
        }
      },
      handler: (request, h) => {
        const phone = request.payload.phone

        setPhoneNumber(request, phone)

        return h.redirect(owner.routes.email)
      }
    }
  }
]
