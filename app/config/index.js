const Joi = require('joi')

// Define config schema
const schema = Joi.object({
  serviceName: Joi.string().default('Register your dog on the dangerous dog act'),
  port: Joi.number().default(3001),
  env: Joi.string().valid('development', 'test', 'production').default('development'),
  useRedis: Joi.boolean().default(false),
  serviceUri: Joi.string().uri(),
  notify: {
    apiKey: Joi.string().required(),
    templateId: Joi.string().required()
  },
  places: {
    apiKey: Joi.string().required()
  },
  govPay: {
    paymentEnabled: Joi.boolean().default(true),
    paymentValue: Joi.number().required(),
    paymentApiKey: Joi.string().required(),
    paymentApiUrl: Joi.string().default('https://publicapi.payments.service.gov.uk/v1/payments'),
    paymentReturnUrl: Joi.string().default('http://localhost:3000/register/payment-return')
  },
  cache: {
    expiresIn: Joi.number().default(1000 * 3600 * 24 * 3), // 3 days
    options: {
      host: Joi.string().default('redis-hostname.default'),
      partition: Joi.string().default('bng-register-web'),
      password: Joi.string().allow(''),
      port: Joi.number().default(6379),
      tls: Joi.object()
    }
  },
  cookie: {
    cookieNameCookiePolicy: Joi.string().default('dangerous_dog_act_cookie_policy'),
    cookieNameSession: Joi.string().default('dangerous_dog_act_session'),
    isSameSite: Joi.string().default('Lax'),
    isSecure: Joi.boolean().default(true),
    password: Joi.string().min(32).required(),
    ttl: Joi.number().default(1000 * 3600 * 24 * 3) // 3 days
  },
  cookieOptions: Joi.object({
    ttl: Joi.number().default(1000 * 60 * 60 * 24 * 365),
    isSameSite: Joi.string().valid('Lax').default('Lax'),
    encoding: Joi.string().valid('base64json').default('base64json'),
    isSecure: Joi.bool().default(true),
    isHttpOnly: Joi.bool().default(true),
    clearInvalid: Joi.bool().default(false),
    strictHeader: Joi.bool().default(true)
  })
})

// Build config
const config = {
  serviceName: process.env.SERVICE_NAME,
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  useRedis: process.env.NODE_ENV !== 'test',
  serviceUri: process.env.SERVICE_URI,
  notify: {
    apiKey: process.env.NOTIFY_API_KEY,
    templateId: '8800c3c1-2b6e-43c4-b089-2d1b34cc3ccb'
  },
  places: {
    apiKey: process.env.OS_PLACES_API_KEY
  },
  govPay: {
    paymentEnabled: process.env.PAYMENT_ENABLED,
    paymentValue: process.env.PAYMENT_VALUE,
    paymentApiKey: process.env.PAYMENT_API_KEY,
    paymentApiUrl: process.env.PAYMENT_API_URL,
    paymentReturnUrl: process.env.PAYMENT_RETURN_URL
  },
  cache: {
    options: {
      host: process.env.REDIS_HOSTNAME,
      password: process.env.REDIS_PASSWORD,
      port: process.env.REDIS_PORT,
      tls: process.env.NODE_ENV === 'production' ? {} : undefined
    }
  },
  cookie: {
    cookieNameCookiePolicy: 'dangerous_dog_act_cookie_policy',
    cookieNameSession: 'dangerous_dog_act_session',
    isSameSite: 'Lax',
    isSecure: process.env.NODE_ENV === 'production',
    password: process.env.COOKIE_PASSWORD
  },
  cookieOptions: {
    ttl: process.env.COOKIE_TTL_IN_MILLIS,
    isSameSite: 'Lax',
    encoding: 'base64json',
    isSecure: process.env.NODE_ENV === 'production',
    isHttpOnly: true,
    clearInvalid: false,
    strictHeader: true
  }
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

// Use the joi validated value
const value = result.value

value.isDev = value.env === 'development'
value.isTest = value.env === 'test'
value.isProd = value.env === 'production'

value.catboxOptions = {
  host: value.redisHost,
  port: value.redisPort,
  password: value.redisPassword,
  tls: value.isProd ? {} : undefined,
  partition: value.redisPartition
}

module.exports = value
