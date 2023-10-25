const { parse, formatISO, parseISO, getDate, getMonth, getYear } = require('date-fns')
const { keys } = require('../constants/dog')

const calcDogIndex = (entry) => entry.length - 1

const set = (request, entryKey, key, value) => {
  const entryValue = request.yar?.get(entryKey) || [{}]

  const dog = calcDogIndex(entryValue)

  entryValue[dog][key] = typeof (value) === 'string' ? value.trim() : value
  request.yar.set(entryKey, entryValue)
}

const get = (request, entryKey, key) => {
  const entryValue = request.yar?.get(entryKey) ?? []

  if (!key) {
    return entryValue
  }

  const dog = calcDogIndex(entryValue)

  return entryValue?.[dog]?.[key]
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
  const savedDate = get(request, keys.entry, keys.dateOfBirth)

  const date = parseISO(savedDate)

  const dob = {
    day: getDate(date),
    month: getMonth(date),
    year: getYear(date)
  }

  return savedDate && dob
}

const setDogDob = (request, value) => {
  const dob = `${value.year}-${value.month}-${value.day}`
  const parsedDob = parse(dob, 'yyyy-MM-dd', new Date(), { locale: 'enGB' })

  set(request, keys.entry, keys.dateOfBirth, formatISO(parsedDob, { representation: 'date' }))
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

const addAnotherDog = (request) => {
  const entryValue = request.yar?.get(keys.entry) || [{}]

  entryValue.push({})

  request.yar.set(keys.entry, entryValue)
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
  setDogPreference,
  addAnotherDog
}
