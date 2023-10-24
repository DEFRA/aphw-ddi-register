const { register } = require('../../constants')

function ViewModel (value, error) {
  this.model = {
    formAction: register.routes.email,
    backLink: register.routes.phoneNumber,
    email: {
      label: {
        text: 'What is your email address?',
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      id: 'email',
      name: 'email',
      value
    }
  }

  if (error) {
    this.model.email.errorMessage = {
      text: 'Enter your email address.'
    }
  }
}

module.exports = ViewModel
