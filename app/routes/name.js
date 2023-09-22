const { setRegisterName, getRegisterName } = require('../session')

module.exports = [{
  method: 'GET',
  path: '/name',
  options: {
    handler: async (request, h) => {
      const name = getRegisterName(request)
      console.log(name)
      return h.view('name', { name })
    }
  }
},
{
  method: 'POST',
  path: '/name',
  options: {
    handler: async (request, h) => {
      const name = request.payload.name
      setRegisterName(request, name)
      return h.redirect('/address')
    }
  }
}]
