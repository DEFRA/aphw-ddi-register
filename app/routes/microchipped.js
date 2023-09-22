module.exports = {
  method: 'GET',
  path: '/microchipped',
  options: {
    handler: async (request, h) => {
      return h.view('microchipped')
    }
  }
}
