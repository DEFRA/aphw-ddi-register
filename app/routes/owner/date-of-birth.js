const Joi = require('joi')
const { owner } = require('../../constants')
const { startOfDay, parse, isAfter, isValid, differenceInYears } = require('date-fns')
const { getBirthDate, setBirthDate } = require('../../session/owner')
const ViewModel = require('../../models/owner/date-of-birth')

const dobValidate = (value, helper) => {
  const options = {
    locale: 'enGB'
  }

  const dob = `${value.year}-${value.month}-${value.day}`

  const today = startOfDay(new Date())
  const parsedDob = parse(dob, 'yyyy-MM-dd', new Date(), options)

  if (!isValid(parsedDob)) {
    return helper.message('Enter a valid date of birth.')
  }

  if (isAfter(parsedDob, today)) {
    return helper.message('Your date of birth must be in the past')
  }

  const age = differenceInYears(today, parsedDob, options)

  if (age < 16) {
    return helper.message('You must be aged 16 or over to register an XL Bully.')
  }

  return value
}

module.exports = [{
  method: 'GET',
  path: owner.routes.dateOfBirth,
  options: {
    handler: async (request, h) => {
      const dob = getBirthDate(request)
      return h.view(owner.views.dateOfBirth, new ViewModel(dob))
    }
  }
},
{
  method: 'POST',
  path: owner.routes.dateOfBirth,
  options: {
    validate: {
      payload: Joi.object({
        day: Joi.number().required(),
        month: Joi.number().required(),
        year: Joi.number().required()
      }).custom(dobValidate),
      failAction: async (request, h, error) => {
        setBirthDate(request, request.payload)
        const dob = getBirthDate(request)
        return h.view(owner.views.dateOfBirth, new ViewModel(dob, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      setBirthDate(request, request.payload)
      return h.redirect(owner.routes.phone)
    }
  }
}]
