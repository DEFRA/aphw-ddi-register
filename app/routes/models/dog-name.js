function ViewModel (value, error) {
  this.model = {
    label: {
      text: 'What is the name of the dog?',
      classes: 'govuk-label--l',
      isPageHeading: true
    },
    id: 'name',
    name: 'name',
    value
  }

  if (error) {
    this.model.errorMessage = {
      text: 'Enter the name of the dog.'
    }
  }
}

module.exports = ViewModel
