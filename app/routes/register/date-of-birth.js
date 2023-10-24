const Joi = require('joi')
const { register } = require('../../constants')
const { startOfDay, parse, isAfter, isValid, differenceInYears } = require('date-fns')
const { getRegisterOwnerDob, setRegisterOwnerDob } = require('../../session/register')
const ViewModel = require('../../models/register/date-of-birth')

const dateOptions = {
  locale: 'enGB'
}

const dobValidate = (value, helper) => {
  const dob = `${value.year}-${value.month}-${value.day}`

  const today = startOfDay(new Date())
  const parsedDob = parse(dob, 'yyyy-MM-dd', new Date(), dateOptions)

  if (!isValid(parsedDob)) {
    return helper.message('Enter a valid date of birth.')
  }

  if (isAfter(parsedDob, today)) {
    return helper.message('Your date of birth must be in the past')
  }

  const age = differenceInYears(today, parsedDob, dateOptions)

  if (age < 18) {
    return helper.message('You must be aged 18 or over to register a dangerous dog.')
  }

  return value
}

module.exports = [{
  method: 'GET',
  path: register.routes.dateOfBirth,
  options: {
    handler: async (request, h) => {
      const dob = getRegisterOwnerDob(request)
      return h.view(register.views.dateOfBirth, new ViewModel(dob))
    }
  }
},
{
  method: 'POST',
  path: register.routes.dateOfBirth,
  options: {
    validate: {
      payload: Joi.object({
        day: Joi.number().required(),
        month: Joi.number().required(),
        year: Joi.number().required()
      }).custom(dobValidate),
      failAction: async (request, h, error) => {
        const dob = { ...getRegisterOwnerDob(request), ...request.payload }
        return h.view(register.views.dateOfBirth, new ViewModel(dob, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      setRegisterOwnerDob(request, request.payload)
      return h.redirect(register.routes.phone)
    }
  }
}]
