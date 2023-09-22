module.exports = [{
  method: 'GET',
  path: '/microchip-number',
  options: {
    handler: async (request, h) => {
      return h.view('microchip-number')
    }
  }
},
{
  method: 'POST',
  path: '/microchip-number',
  options: {
    handler: async (request, h) => {
      return h.redirect('/confirmation')
    }
  }
}]
