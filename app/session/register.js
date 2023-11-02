const { keys } = require('../constants/register')

const set = (request, entryKey, key, value) => {
  const entryValue = request.yar?.get(entryKey) || {}
  entryValue[key] = typeof (value) === 'string' ? value.trim() : value
  request.yar.set(entryKey, entryValue)
}

const get = (request, entryKey, key) => {
  return key ? request.yar?.get(entryKey)?.[key] : request.yar?.get(entryKey)
}

const getRegister = (request) => {
  return get(request, keys.entry)
}

const setRegister = (request, value) => {
  set(request, keys.entry, value)
}

const getRegisterName = (request) => {
  return get(request, keys.entry, keys.name)
}

const setRegisterName = (request, value) => {
  set(request, keys.entry, keys.name, value)
}

const getRegisterOwnerDob = (request) => {
  return get(request, keys.entry, keys.dateOfBirth)
}

const setRegisterOwnerDob = (request, value) => {
  set(request, keys.entry, keys.dateOfBirth, value)
}

const getRegisterAddress = (request) => {
  return get(request, keys.entry, keys.address)
}

const setRegisterAddress = (request, value) => {
  set(request, keys.entry, keys.address, value)
}

const getEmail = (request) => {
  return get(request, keys.entry, keys.email)
}

const setEmail = (request, value) => {
  set(request, keys.entry, keys.email, value)
}

const getRegisterAddressPostcode = (request) => {
  return get(request, keys.entry, keys.address)?.postcode
}

const setRegisterAddressPostcode = (request, value) => {
  set(request, keys.entry, keys.address, value)
}

const getRegisterPhoneNumber = (request) => {
  return get(request, keys.entry, keys.phone)
}

const setRegisterPhoneNumber = (request, value) => {
  set(request, keys.entry, keys.phone, value)
}

const getRegisterPaymentId = (request) => {
  return get(request, keys.entry, keys.paymentId)
}

const setRegisterPaymentId = (request, value) => {
  set(request, keys.entry, keys.paymentId, value)
}

const getRegistrationId = (request) => {
  return get(request, keys.entry, keys.registrationId)
}

const setRegistrationId = (request, value) => {
  set(request, keys.entry, keys.registrationId, value)
}

const getRegistrationPaymentSucessful = (request) => {
  return get(request, keys.entry, keys.paymentSuccessful)
}

const setRegistrationPaymentSucessful = (request, value) => {
  set(request, keys.entry, keys.paymentSuccessful, value)
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
  setEmail,
  getRegisterPhoneNumber,
  setRegisterPhoneNumber,
  getRegisterPaymentId,
  setRegisterPaymentId,
  getRegistrationId,
  setRegistrationId,
  getRegistrationPaymentSucessful,
  setRegistrationPaymentSucessful
}
