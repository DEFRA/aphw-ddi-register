module.exports = {
  method: 'GET',
  path: '/name',
  options: {
    handler: async (request, h) => {
      return h.view('name')
    }
  }
}
