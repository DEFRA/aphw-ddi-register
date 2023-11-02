const { dog } = require('../../constants')

function ViewModel (value, error) {
  this.model = {
    formAction: dog.routes.microchipNumber,
    backLink: dog.routes.microchipped,
    microchipNumber: {
      label: {
        text: 'What is your dog\'s microchip number?',
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      hint: {
        text: 'To find the microchip number you should check the dog\'s vaccination record or ask a vet. Microchip numbers usually have 15 digits.'
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
