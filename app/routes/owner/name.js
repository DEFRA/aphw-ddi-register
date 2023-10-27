const Joi = require('joi')
const { owner } = require('../../constants')
const { getName, setName } = require('../../session/owner')
const ViewModel = require('../../models/owner/name')

module.exports = [{
  method: 'GET',
  path: owner.routes.name,
  options: {
    handler: async (request, h) => {
      const name = getName(request)
      return h.view(owner.views.name, new ViewModel(name))
    }
  }
},
{
  method: 'POST',
  path: owner.routes.name,
  options: {
    validate: {
      payload: Joi.object({
        name: Joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const name = getName(request)
        return h.view(owner.views.name, new ViewModel(name, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const name = request.payload.name
      setName(request, name)
      return h.redirect(owner.routes.postcode)
    }
  }
}]
