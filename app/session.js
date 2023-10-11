const keys = require('./session-keys')

const entries = {
  register: 'register'
}

const set = (request, entryKey, key, value) => {
  const entryValue = request.yar?.get(entryKey) || {}
  entryValue[key] = typeof (value) === 'string' ? value.trim() : value
  request.yar.set(entryKey, entryValue)
}

const get = (request, entryKey, key) => {
  return key ? request.yar?.get(entryKey)?.[key] : request.yar?.get(entryKey)
}

const getRegister = (request) => {
  return get(request, entries.register)
}

const setRegister = (request, value) => {
  set(request, entries.register, value)
}

const getRegisterName = (request) => {
  return get(request, entries.register, keys.register.name)
}

const setRegisterName = (request, value) => {
  set(request, entries.register, keys.register.name, value)
}

const getRegisterAddress = (request) => {
  return get(request, entries.register, keys.register.address)
}

const setRegisterAddress = (request, value) => {
  set(request, entries.register, keys.register.address, value)
}

const getRegisterDogBreed = (request) => {
  return get(request, entries.register, keys.register.dogBreed)
}

const setRegisterDogBreed = (request, value) => {
  set(request, entries.register, keys.register.dogBreed, value)
}

const getRegisterMicrochipped = (request) => {
  return get(request, entries.register, keys.register.microchipped)
}

const setRegisterMicrochipped = (request, value) => {
  set(request, entries.register, keys.register.microchipped, value)
}

const getRegisterMicrochipNumber = (request) => {
  return get(request, entries.register, keys.register.microchipNumber)
}

const setRegisterMicrochipNumber = (request, value) => {
  set(request, entries.register, keys.register.microchipNumber, value)
}

const getEmail = (request) => {
  return get(request, entries.register, keys.email)
}

const setEmail = (request, value) => {
  set(request, entries.register, keys.email, value)
}

const getRegisterAddressPostcode = (request) => {
  return get(request, entries.register, keys.register.address)?.postcode
}

const setRegisterAddressPostcode = (request, value) => {
  set(request, entries.register, keys.register.address, value)
}

module.exports = {
  getRegister,
  setRegister,
  getRegisterName,
  setRegisterName,
  getRegisterAddress,
  setRegisterAddress,
  getRegisterAddressPostcode,
  setRegisterAddressPostcode,
  getRegisterDogBreed,
  setRegisterDogBreed,
  getRegisterMicrochipped,
  setRegisterMicrochipped,
  getRegisterMicrochipNumber,
  setRegisterMicrochipNumber,
  getEmail,
  setEmail
}
