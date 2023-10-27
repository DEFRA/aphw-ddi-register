const { dog } = require('../../constants')

function ViewModel (value, error) {
  this.model = {
    formAction: dog.routes.neutered,
    backLink: dog.routes.gender,
    neutered: {
      name: 'neutered',
      fieldset: {
        legend: {
          text: 'Is your dog neutered?',
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
          value: 'No',
          text: 'No',
          checked: value === 'No'
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
      text: 'Select whether your dog has been neutered.'
    }
  }
}

module.exports = ViewModel
