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

  await server.register(require('@hapi/inert'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/views'))
  await server.register(require('./plugins/view-context'))
  await server.register(require('./plugins/cookies.js'))
  await server.register(require('./plugins/session-cache'))
  await initialiseTables()

  return server
}

module.exports = createServer
