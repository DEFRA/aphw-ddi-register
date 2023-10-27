const { dog } = require('../../constants')

function ViewModel (value, error) {
  this.model = {
    formAction: dog.routes.microchipped,
    backLink: dog.routes.gender,
    microchipped: {
      name: 'microchipped',
      fieldset: {
        legend: {
          text: 'Is your dog microchipped?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      items: [
        {
          value: 'Yes',
          text: 'Yes',
          checked: value === 'Yes'
        },
        {
          value: 'Not sure',
          text: 'Not sure',
          checked: value === 'Not sure'
        }
      ]
    }
  }

  if (error) {
    this.model.microchipped.errorMessage = {
      text: 'Select whether your dog is microchipped.'
    }
  }
}

module.exports = ViewModel
