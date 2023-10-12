function ViewModel (value, error) {
  this.model = {
    label: {
      text: 'What colour is your dog?',
      classes: 'govuk-label--l',
      isPageHeading: true
    },
    id: 'colour',
    name: 'colour',
    classes: 'govuk-input--width-10',
    value
  }

  if (error) {
    this.model.errorMessage = {
      text: 'Enter the colour of the dog.'
    }
  }
}

module.exports = ViewModel
