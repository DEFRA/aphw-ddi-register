const Joi = require('joi')
const { dog, owner } = require('../../constants')
const { addAnotherDog } = require('../../session/dog')
const ViewModel = require('../../models/dog/add-another')

module.exports = [{
  method: 'GET',
  path: dog.routes.addAnother,
  options: {
    handler: async (_, h) => {
      return h.view(dog.views.addAnother, new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: dog.routes.addAnother,
  options: {
    validate: {
      payload: Joi.object({
        addAnother: Joi.string().required()
      }),
      failAction: async (_, h, error) => {
        return h.view(dog.views.addAnother, new ViewModel(error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const addAnother = request.payload.addAnother

      if (addAnother === 'yes') {
        addAnotherDog(request)

        return h.redirect(dog.routes.name)
      }

      return h.redirect(owner.routes.summary)
    }
  }
}]
