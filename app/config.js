const joi = require('joi')

const schema = joi.object({
  port: joi.number().default(3000)
})

const config = {
  port: process.env.PORT
}

const { err, value } = schema.validate(config)

if (err) {
  throw new Error(`Config is invalid: ${err.message}`)
}

module.exports = value
