function ViewModel (value, error) {
  this.model = {
    label: {
      text: 'What is your dogs microchip number?',
      classes: 'govuk-label--l',
      isPageHeading: true
    },
    id: 'microchipNumber',
    name: 'microchipNumber',
    value
  }

  if (error) {
    this.model.errorMessage = {
      text: 'Enter your dogs microchip number.'
    }
  }
}

module.exports = ViewModel
