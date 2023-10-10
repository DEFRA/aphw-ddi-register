const { getToken } = require('../auth')
const sendEmail = require('./notify')
const { serviceUri } = require('../config')
const { templateIdLogin } = require('../config').notify

async function createAndCacheToken (request, email, redirectTo, userType, data) {
  const { magiclinkCache } = request.server.app

  const token = await getToken(email)
  const tokens = await magiclinkCache.get(email) ?? []
  tokens.push(token)
  await magiclinkCache.set(email, tokens)
  await magiclinkCache.set(token, { email, redirectTo, userType, data })
  return token
}

async function sendMagicLinkEmail (request, email, templateId, redirectTo, userType, data) {
  const token = await createAndCacheToken(request, email, redirectTo, userType, data)

  return sendEmail(templateId, email, {
    personalisation: { magiclink: `${serviceUri}/verify-login?token=${token}&email=${email}` },
    reference: token
  })
}

async function sendLoginMagicLink (request, email) {
  return sendMagicLinkEmail(request, email, templateIdLogin, 'name', 'farmerClaim')
}

module.exports = {
  sendLoginMagicLink
}
