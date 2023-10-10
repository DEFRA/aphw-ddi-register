function ViewModel (email, register, error) {
  this.model = {
    name: register.name,
    email,
    address: [],
    breed: register.dogBreed,
    microchipped: register.microchipped,
    microchipNumber: register.microchipNumber
  }

  const address = register.address

  if (address !== null) {
    Object.keys(address).forEach(key => {
      if (address[key]) {
        this.model.address.push(address[key])
      }
    })
  }
}

module.exports = ViewModel
