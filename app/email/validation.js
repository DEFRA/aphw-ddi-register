const Joi = require('joi')
const enterEmail = 'Enter an email address'
const validEmail = 'Enter an email address in the correct format, like name@example.com'

module.exports = {
  email: Joi.string().trim().email().required()
    .messages({
      'any.required': enterEmail,
      'string.base': enterEmail,
      'string.email': validEmail,
      'string.empty': enterEmail
    })
}
