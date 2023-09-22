function ViewModel (value, error) {
  this.model = {
    label: {
      text: 'What is your name?',
      classes: 'govuk-label--l',
      isPageHeading: true
    },
    id: 'name',
    name: 'name',
    value
  }

  if (error) {
    this.model.errorMessage = {
      text: 'Enter you name.'
    }
  }
}

module.exports = ViewModel
