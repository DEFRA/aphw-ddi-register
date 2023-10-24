const { dog } = require('../../constants')

function ViewModel (value, error) {
  this.model = {
    formAction: dog.routes.microchipNumber,
    backLink: dog.routes.microchipped,
    microchipNumber: {
      label: {
        text: 'What is your dogs microchip number?',
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      id: 'microchipNumber',
      name: 'microchipNumber',
      value
    }
  }

  if (error) {
    this.model.microchipNumber.errorMessage = {
      text: 'Enter your dogs microchip number.'
    }
  }
}

module.exports = ViewModel
