const { v4: uuid } = require('uuid')
const { testToken } = require('../config')

const getToken = async function getToken () {
  return testToken || uuid()
}

const lookupToken = async (request, token) => {
  const { magiclinkCache } = request.server.app
  return (await magiclinkCache.get(token)) ?? {}
}

const setAuthCookie = (request, email, userType) => {
  request.cookieAuth.set({ email, userType })
  console.log(`Logged in user with email '${email}'.`)
}

const clearAuthCookie = (request) => {
  request.cookieAuth.clear()
  console.log('Auth cookie cleared.')
}

module.exports = {
  getToken,
  clearAuthCookie,
  lookupToken,
  setAuthCookie
}
