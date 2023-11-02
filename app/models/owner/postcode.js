const { owner } = require('../../constants')

function ViewModel (value, error) {
  this.model = {
    formAction: owner.routes.postcode,
    backLink: owner.routes.name,
    postcode: {
      label: {
        text: 'Postcode'
      },
      id: 'postcode',
      name: 'postcode',
      classes: 'govuk-input--width-10',
      value,
      autocomplete: 'postcode'
    }
  }

  if (error) {
    this.model.postcode.errorMessage = {
      text: 'Enter your postcode.'
    }
  }
}

module.exports = ViewModel
