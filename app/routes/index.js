const { register } = require('../constants')

module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return h.view('index', { startLink: register.routes.name })
  }
}
