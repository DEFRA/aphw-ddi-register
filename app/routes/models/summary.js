const formatDate = date => {
  if (date === null || date === undefined) { return date }

  return `${date.day}/${date.month}/${date.year}`
}

function ViewModel (register, dog, error) {
  console.log(dog)

  this.model = {
    register: {
      name: register?.name,
      dob: formatDate(register?.ownerDob),
      phone: register?.phone,
      email: register?.email,
      address: []
    },
    dog: {
      name: dog?.name,
      dob: formatDate(dog?.dogDob),
      colour: dog?.colour,
      gender: dog?.gender,
      microchipped: dog?.microchipped,
      microchipNumber: dog?.microchipNumber,
      preference: dog?.preference
    }
  }

  const address = register?.address

  if (address !== null && address !== undefined) {
    console.log(address)
    Object.keys(address).forEach(key => {
      if (address[key]) {
        this.model.register.address.push(address[key])
      }
    })
  }
}

module.exports = ViewModel
