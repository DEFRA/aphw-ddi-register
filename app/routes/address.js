module.exports = {
  method: 'GET',
  path: '/address',
  options: {
    handler: async (request, h) => {
      return h.view('address')
    }
  }
}
