function ViewModel (value, error) {
  this.model = {
    label: {
      text: 'What is your email address?',
      classes: 'govuk-label--l',
      isPageHeading: true
    },
    id: 'email',
    name: 'email',
    value
  }

  if (error) {
    this.model.errorMessage = {
      text: 'Enter your email address.'
    }
  }
}

module.exports = ViewModel
