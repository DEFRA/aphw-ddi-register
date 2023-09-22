module.exports = [{
  method: 'GET',
  path: '/name',
  options: {
    handler: async (request, h) => {
      return h.view('name')
    }
  }
},
{
  method: 'POST',
  path: '/name',
  options: {
    handler: async (request, h) => {
      return h.redirect('/address')
    }
  }
}]
