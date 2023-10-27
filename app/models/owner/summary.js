const { owner: ownerConstants, dog: dogConstants } = require('../../constants')

const formatDate = date => {
  if (date === null || date === undefined) {
    return date
  }

  return `${date.day}/${date.month}/${date.year}`
}

function ViewModel (owner, dogs, error) {
  this.model = {
    formAction: ownerConstants.routes.confirmation,
    summary: {
      register: {
        name: owner?.name,
        dateOfBirth: formatDate(owner?.dateOfBirth),
        phone: owner?.phone,
        email: owner?.email,
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

  const address = owner?.address

  if (address !== null && address !== undefined) {
    Object.keys(address).forEach(key => {
      if (address[key]) {
        this.model.summary.register.address.push(address[key])
      }
    })
  }
}

module.exports = ViewModel
