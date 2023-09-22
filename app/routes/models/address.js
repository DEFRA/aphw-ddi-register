function ViewModel (value, error) {
  this.model = {
    label: {
      text: 'What is your address?',
      classes: 'govuk-label--l',
      isPageHeading: true
    },
    id: 'addressLine1',
    name: 'addressLine1',
    value: value
  }

  if (error) {
    this.model.errorMessage = {
      text: 'Enter your address.'
    }
  }
}

module.exports = ViewModel
