const { dog } = require('./keys')

const set = (request, entryKey, key, value) => {
  const entryValue = request.yar?.get(entryKey) || {}
  entryValue[key] = typeof (value) === 'string' ? value.trim() : value
  request.yar.set(entryKey, entryValue)
}

const get = (request, entryKey, key) => {
  return key ? request.yar?.get(entryKey)?.[key] : request.yar?.get(entryKey)
}

const getDog = (request) => {
  return get(request, dog.entry)
}

const setDog = (request, value) => {
  set(request, dog.entry, value)
}

const getDogName = (request) => {
  return get(request, dog.entry, dog.name)
}

const setDogName = (request, value) => {
  set(request, dog.entry, dog.name, value)
}

const getDogDob = (request) => {
  return get(request, dog.entry, dog.dogDob)
}

const setDogDob = (request, value) => {
  set(request, dog.entry, dog.dogDob, value)
}

const getDogColour = (request) => {
  return get(request, dog.entry, dog.colour)
}

const setDogColour = (request, value) => {
  set(request, dog.entry, dog.colour, value)
}

const getDogGender = (request) => {
  return get(request, dog.entry, dog.gender)
}

const setDogGender = (request, value) => {
  set(request, dog.entry, dog.gender, value)
}

const getDogMicrochipped = (request) => {
  return get(request, dog.entry, dog.microchipped)
}

const setDogMicrochipped = (request, value) => {
  set(request, dog.entry, dog.microchipped, value)
}

const getDogMicrochipNumber = (request) => {
  return get(request, dog.entry, dog.microchipNumber)
}

const setDogMicrochipNumber = (request, value) => {
  set(request, dog.entry, dog.microchipNumber, value)
}

const getDogPreference = (request) => {
  return get(request, dog.entry, dog.preference)
}

const setDogPreference = (request, value) => {
  set(request, dog.entry, dog.preference, value)
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
