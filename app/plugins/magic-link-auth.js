const { cookie, cookieOptions } = require('../config')

module.exports = {
  plugin: {
    name: 'auth',
    register: async (server, _) => {
      server.auth.strategy('session', 'cookie', {
        cookie: {
          isSameSite: cookieOptions.isSameSite,
          isSecure: cookieOptions.isSecure,
          name: cookie.cookieNameAuth,
          password: cookie.password,
          path: cookieOptions.path,
          ttl: cookieOptions.ttl
        },
        keepAlive: true,
        redirectTo: (request) => {
          return '/login'
        },
        validateFunc: async (request, session) => {
          const result = { valid: false }
          result.valid = true

          return result
        }
      })
      server.auth.default({ strategy: 'session', mode: 'required' })
    }
  }
}
