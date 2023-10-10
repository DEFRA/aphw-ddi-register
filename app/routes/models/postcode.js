function ViewModel (value, error) {
  this.model = {
    label: {
      text: 'Postcode',
    },
    id: 'postcode',
    name: 'postcode',
    classes: 'govuk-input--width-10',
    value,
    autocomplete: "postcode"
  }

  if (error) {
    this.model.errorMessage = {
      text: 'Enter your postcode.'
    }
  }
}

module.exports = ViewModel
