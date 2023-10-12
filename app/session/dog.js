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

module.exports = {
  getDog,
  setDog,
  getDogName,
  setDogName,
  getDogMicrochipped,
  setDogMicrochipped,
  getDogMicrochipNumber,
  setDogMicrochipNumber
}
