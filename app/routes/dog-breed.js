module.exports = [{
  method: 'GET',
  path: '/dog-breed',
  options: {
    handler: async (request, h) => {
      return h.view('dog-breed')
    }
  }
},
{
  method: 'POST',
  path: '/dog-breed',
  options: {
    handler: async (request, h) => {
      return h.redirect('/microchipped')
    }
  }
}]
