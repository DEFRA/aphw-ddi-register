module.exports = [{
  method: 'GET',
  path: '/address',
  options: {
    handler: async (request, h) => {
      return h.view('address')
    }
  }
},
{
  method: 'POST',
  path: '/address',
  options: {
    handler: async (request, h) => {
      return h.redirect('/dog-breed')
    }
  }
}]
