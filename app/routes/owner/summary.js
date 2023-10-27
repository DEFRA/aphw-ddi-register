const { owner } = require('../../constants')
const { getOwner } = require('../../session/owner')
const { getDog } = require('../../session/dog')
const ViewModel = require('../../models/owner/summary')

module.exports = {
  method: 'GET',
  path: owner.routes.summary,
  options: {
    handler: async (request, h) => {
      const registerDetails = getOwner(request)
      const dog = getDog(request)

      return h.view(owner.views.summary, new ViewModel(registerDetails, dog))
    }
  }
}
