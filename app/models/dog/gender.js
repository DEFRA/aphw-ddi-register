const { dog } = require('../../constants')

function ViewModel (value, error) {
  this.model = {
    formAction: dog.routes.gender,
    backLink: dog.routes.colour,
    gender: {
      name: 'gender',
      fieldset: {
        legend: {
          text: 'What gender is your dog?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      items: [
        {
          value: 'Male',
          text: 'Male',
          checked: value === 'Male'
        },
        {
          value: 'Female',
          text: 'Female',
          checked: value === 'Female'
        }
      ]
    }
  }

  if (error) {
    this.model.gender.errorMessage = {
      text: 'Select if your dog is male or female.'
    }
  }
}

module.exports = ViewModel
