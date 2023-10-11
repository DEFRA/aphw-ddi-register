const Joi = require('joi')
const { startOfDay, parse, isAfter, isValid, differenceInYears } = require('date-fns')
const { getRegisterOwnerDob, setRegisterOwnerDob } = require('../session')
const ViewModel = require('./models/owner-dob')

const dobValidate = (value, helper) => {
  const options = {
    locale: 'enGB'
  }
  
  const dob = `${value.year}-${value.month}-${value.day}`

  const today = startOfDay(new Date())
  const parsedDob = parse(dob, 'yyyy-mm-dd', new Date(), options)

  if (!isValid(parsedDob)) {
    return helper.message('Enter a valid date of birth.')
  }

  if (isAfter(parsedDob, today)) {
    return helper.message('Your date of birth must be in the past')
  }

  const age = differenceInYears(today, parsedDob, options)

  if (age < 18) {
    return helper.message('You must be aged 18 or over to register a dangerous dog.')
  }

  return value
}

module.exports = [{
  method: 'GET',
  path: '/owner-dob',
  options: {
    handler: async (request, h) => {
      const dob = getRegisterOwnerDob(request)
      return h.view('owner-dob', new ViewModel(dob))
    }
  }
},
{
  method: 'POST',
  path: '/owner-dob',
  options: {
    validate: {
      payload: Joi.object({
        day: Joi.number().required(),
        month: Joi.number().required(),
        year: Joi.number().required()
      }).custom(dobValidate),
      failAction: async (request, h, error) => {
        setRegisterOwnerDob(request, request.payload)
        const name = getRegisterOwnerDob(request)
        return h.view('owner-dob', new ViewModel(name, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      setRegisterOwnerDob(request, request.payload)
      return h.redirect('/phone')
    }
  }
}]
