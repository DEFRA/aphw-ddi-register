const { register } = require('../../constants')

function ViewModel (value, error) {
  this.model = {
    formAction: register.routes.name,
    backLink: '/',
    name: {
      label: {
        text: 'What is your name?',
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      id: 'name',
      name: 'name',
      value
    }
  }

  if (error) {
    this.model.name.errorMessage = {
      text: 'Enter your name.'
    }
  }
}

module.exports = ViewModel
