const { keys } = require('../constants/dog')

const set = (request, entryKey, key, value) => {
  const entryValue = request.yar?.get(entryKey) || {}
  entryValue[key] = typeof (value) === 'string' ? value.trim() : value
  request.yar.set(entryKey, entryValue)
}

const get = (request, entryKey, key) => {
  return key ? request.yar?.get(entryKey)?.[key] : request.yar?.get(entryKey)
}

const getDog = (request) => {
  return get(request, keys.entry)
}

const setDog = (request, value) => {
  set(request, keys.entry, value)
}

const getDogName = (request) => {
  return get(request, keys.entry, keys.name)
}

const setDogName = (request, value) => {
  set(request, keys.entry, keys.name, value)
}

const getDogDob = (request) => {
  return get(request, keys.entry, keys.dogDob)
}

const setDogDob = (request, value) => {
  set(request, keys.entry, keys.dogDob, value)
}

const getDogColour = (request) => {
  return get(request, keys.entry, keys.colour)
}

const setDogColour = (request, value) => {
  set(request, keys.entry, keys.colour, value)
}

const getDogGender = (request) => {
  return get(request, keys.entry, keys.gender)
}

const setDogGender = (request, value) => {
  set(request, keys.entry, keys.gender, value)
}

const getDogMicrochipped = (request) => {
  return get(request, keys.entry, keys.microchipped)
}

const setDogMicrochipped = (request, value) => {
  set(request, keys.entry, keys.microchipped, value)
}

const getDogMicrochipNumber = (request) => {
  return get(request, keys.entry, keys.microchipNumber)
}

const setDogMicrochipNumber = (request, value) => {
  set(request, keys.entry, keys.microchipNumber, value)
}

const getDogPreference = (request) => {
  return get(request, keys.entry, keys.preference)
}

const setDogPreference = (request, value) => {
  set(request, keys.entry, keys.preference, value)
}

module.exports = {
  getDog,
  setDog,
  getDogName,
  setDogName,
  getDogDob,
  setDogDob,
  getDogColour,
  setDogColour,
  getDogGender,
  setDogGender,
  getDogMicrochipped,
  setDogMicrochipped,
  getDogMicrochipNumber,
  setDogMicrochipNumber,
  getDogPreference,
  setDogPreference
}
