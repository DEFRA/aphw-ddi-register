require('./insights').setup()
const config = require('./config')
const Hapi = require('@hapi/hapi')
const { initialiseTables } = require('./storage')

async function createServer () {
  const server = Hapi.Server({
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  const magiclinkCache = server.cache({
    expiresIn: 1000 * 60 * 15,
    segment: 'magiclinks'
  }) // 15 mins
  server.app.magiclinkCache = magiclinkCache

  await server.register(require('@hapi/inert'))
  await server.register(require('@hapi/cookie'))
  await server.register(require('./plugins/magic-link-auth'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/views'))
  await server.register(require('./plugins/view-context'))
  await server.register(require('./plugins/cookies.js'))
  await server.register(require('./plugins/session-cache'))
  await initialiseTables()

  return server
}

module.exports = createServer
