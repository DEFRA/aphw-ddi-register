const { register } = require('../../constants')

function ViewModel (postcode, addresses = [], error) {
  const defaultOption = {
    text: `${addresses.length} addresses found`,
    value: -1
  }

  const items = [defaultOption].concat(addresses.map((address, index) => ({
    text: `${address.addressLine1}, ${address.addressTown}, ${address.addressPostcode}`,
    value: index
  })))

  this.model = {
    formAction: register.routes.selectAddress,
    backLink: register.routes.postcode,
    addressRoute: register.routes.address,
    postcode,
    results: {
      label: {
        text: 'Select an address'
      },
      id: 'addresses',
      name: 'address',
      items
    }
  }

  if (error) {
    this.model.results.errorMessage = {
      text: 'Select an address.'
    }
  }
}

module.exports = ViewModel
