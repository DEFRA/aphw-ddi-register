const { dog, register } = require('../../constants')

function ViewModel(value, error) {
  this.model = {
    formAction: dog.routes.name,
    backLink: register.routes.email,
    name: {
      label: {
        text: 'What is the name of the dog?',
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
      text: 'Enter the name of the dog.'
    }
  }
}

module.exports = ViewModel
