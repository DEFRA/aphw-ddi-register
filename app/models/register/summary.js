const { parse, format } = require('date-fns')
const { register: registerConstants, dog: dogConstants } = require('../../constants')

const formatDate = date => {
  const options = {
    locale: 'enGB'
  }

  if (date === null || date === undefined) {
    return null
  }

  const parsedDate = parse(date, 'yyyy-MM-dd', new Date(), options)

  return format(parsedDate, 'dd MMMM yyyy')
}

function ViewModel (register, dogs, error) {
  this.model = {
    formAction: registerConstants.routes.confirmation,
    summary: {
      register: {
        name: register?.name,
        dateOfBirth: formatDate(register?.dateOfBirth),
        phone: register?.phone,
        email: register?.email,
        address: []
      },
      dogs: dogs.map((dog, index) => ({
        id: index + 1,
        name: dog?.name,
        dateOfBirth: formatDate(dog?.[dogConstants.keys.dateOfBirth]),
        colour: dog?.[dogConstants.keys.colour],
        gender: dog?.gender,
        microchipped: dog?.microchipped,
        microchipNumber: dog?.microchipNumber,
        preference: dog?.preference
      }))
    }
  }

  const address = register?.address

  if (address !== null && address !== undefined) {
    Object.keys(address).forEach(key => {
      if (address[key]) {
        this.model.summary.register.address.push(address[key])
      }
    })
  }
}

module.exports = ViewModel
