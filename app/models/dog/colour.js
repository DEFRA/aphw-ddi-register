const { dog } = require('../../constants')

function ViewModel (value, error) {
  this.model = {
    formAction: dog.routes.colour,
    backLink: dog.routes.dateOfBirth,
    colour: {
      label: {
        text: 'What colour is your dog?',
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      hint: {
        text: 'Enter the colours that best apply to your dog, for example, black, blue, brindle, fawn, red or white. You can enter more than one colour if your dog is mixed-colour.'
      },
      id: 'colour',
      name: 'colour',
      classes: 'govuk-input--width-10',
      value
    }
  }

  if (error) {
    this.model.colour.errorMessage = {
      text: 'Enter the colour of the dog.'
    }
  }
}

module.exports = ViewModel
