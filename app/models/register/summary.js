const { register: registerConstants, dog: dogConstants } = require('../../constants')

const formatDate = date => {
  if (date === null || date === undefined) {
    return date
  }

  return `${date.day}/${date.month}/${date.year}`
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
