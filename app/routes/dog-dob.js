const Joi = require('joi')
const { startOfDay, parse, isAfter, isValid } = require('date-fns')
const { getDogDob, setDogDob } = require('../session/dog')
const ViewModel = require('./models/dog-dob')

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

  return value
}

module.exports = [{
  method: 'GET',
  path: '/dog-dob',
  options: {
    handler: async (request, h) => {
      const dob = getDogDob(request)
      return h.view('dog-dob', new ViewModel(dob))
    }
  }
},
{
  method: 'POST',
  path: '/dog-dob',
  options: {
    validate: {
      payload: Joi.object({
        day: Joi.number().required(),
        month: Joi.number().required(),
        year: Joi.number().required()
      }).custom(dobValidate),
      failAction: async (request, h, error) => {
        setDogDob(request, request.payload)
        const name = getRegisterOwnerDob(request)
        return h.view('dog-dob', new ViewModel(name, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      setDogDob(request, request.payload)
      return h.redirect('/dog-colour')
    }
  }
}]
