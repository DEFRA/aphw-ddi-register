const Joi = require('joi')
const { owner } = require('../../../constants')
const { getName, setName } = require('../../../session/owner')
const ViewModel = require('../../../models/owner/name')

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
      options: {
        abortEarly: false
      },
      payload: Joi.object({
        title: Joi.string().allow(null).allow('').optional(),
        firstName: Joi.string(),
        lastName: Joi.string()
      }),
      failAction: async (request, h, error) => {
        const name = getName(request)
        return h.view(owner.views.name, new ViewModel(name, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      setName(request, request.payload)
      return h.redirect(owner.routes.postcode)
    }
  }
}]
