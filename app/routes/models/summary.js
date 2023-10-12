function ViewModel (register, dog, error) {
  this.model = {
    name: register?.name,
    email: register?.email,
    address: [],
    microchipped: dog?.microchipped,
    microchipNumber: dog?.microchipNumber
  }

  // const address = register.address

  // if (address !== null) {
  //   Object.keys(address).forEach(key => {
  //     if (address[key]) {
  //       this.model.address.push(address[key])
  //     }
  //   })
  // }
}

module.exports = ViewModel
