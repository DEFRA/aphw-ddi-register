const errorMessages = {
  addressLine1: 'Enter the first line of the address',
  addressLine2: 'Enter the second line of the address',
  town: 'Enter the town or city',
  county: 'Enter a valid county',
  postcode: 'Enter the postcode'
}

function ViewModel(address, errors) {
  this.model = {
    addressLine1: {
      id: 'addressLine1',
      name: 'addressLine1',
      label: {
        text: 'Address Line 1'
      },
      value: address?.addressLine1,
      autocomplete: "address-line1"
    },
    addressLine2: {
      id: 'addressLine2',
      name: 'addressLine2',
      label: {
        text: 'Address Line 2 (optional)'
      },
      value: address?.addressLine2,
      autocomplete: "address-line1"
    },
    town: {
      id: 'town',
      name: 'town',
      label: {
        text: 'Town or city'
      },
      value: address?.town,
      autocomplete: "address-level2"
    },
    county: {
      id: 'county',
      name: 'county',
      label: {
        text: 'County'
      },
      value: address?.county,
      autocomplete: "addressCounty"
    },
    postcode: {
      id: 'postcode',
      name: 'postcode',
      label: {
        text: 'Postcode'
      },
      value: address?.postcode,
      autocomplete: "postal-code"
    },
    errors: []
  }

  if (errors) {
    for (const error of errors.details) {
      const name = error.path[0]

      const prop = this.model[name]

      if (prop !== undefined) {
        prop.errorMessage = {
          text: errorMessages[name]
        }

        this.model.errors.push({
          text: errorMessages[name],
          href: `#${name}`
        })
      }
    }
  }
}

module.exports = ViewModel
