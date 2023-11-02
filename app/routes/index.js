const { owner } = require('../constants')

module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return h.view('index', { startLink: owner.routes.name })
  }
}
