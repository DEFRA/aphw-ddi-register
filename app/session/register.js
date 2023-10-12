const { register } = require('./keys')

const set = (request, entryKey, key, value) => {
  const entryValue = request.yar?.get(entryKey) || {}
  entryValue[key] = typeof (value) === 'string' ? value.trim() : value
  request.yar.set(entryKey, entryValue)
}

const get = (request, entryKey, key) => {
  return key ? request.yar?.get(entryKey)?.[key] : request.yar?.get(entryKey)
}

const getRegister = (request) => {
  return get(request, register.entry)
}

const setRegister = (request, value) => {
  set(request, register.entry, value)
}

const getRegisterName = (request) => {
  return get(request, register.entry, register.name)
}

const setRegisterName = (request, value) => {
  set(request, register.entry, register.name, value)
}

const getRegisterOwnerDob = (request) => {
  return get(request, entries.register, keys.register.ownerDob)
}

const setRegisterOwnerDob = (request, value) => {
  set(request, entries.register, keys.register.ownerDob, value)
}

const getRegisterAddress = (request) => {
  return get(request, register.entry, register.address)
}

const setRegisterAddress = (request, value) => {
  set(request, register.entry, register.address, value)
}

const getEmail = (request) => {
  return get(request, register.entry, register.email)
}

const setEmail = (request, value) => {
  set(request, register.entry, register.email, value)
}

const getRegisterAddressPostcode = (request) => {
  return get(request, register.entry, register.address)?.postcode
}

const setRegisterAddressPostcode = (request, value) => {
  set(request, register.entry, register.address, value)
}

module.exports = {
  getRegister,
  setRegister,
  getRegisterName,
  setRegisterName,
  getRegisterOwnerDob,
  setRegisterOwnerDob,
  getRegisterAddress,
  setRegisterAddress,
  getRegisterAddressPostcode,
  setRegisterAddressPostcode,
  getEmail,
  setEmail
}
