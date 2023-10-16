const { dog } = require('../../constants')

function ViewModel(dob, errors) {
  this.model = {
    formAction: dog.routes.dateOfBirth,
    backLink: dog.routes.name,
    dateOfBirth: {
      id: 'dog-date-of-birth',
      fieldset: {
        legend: {
          text: 'What is your dog\'s date of birth?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      items: [
        {
          name: 'day',
          classes: 'govuk-input--width-2',
          value: dob?.day
        },
        {
          name: 'month',
          classes: 'govuk-input--width-2',
          value: dob?.month
        },
        {
          name: 'year',
          classes: 'govuk-input--width-4',
          value: dob?.year
        }
      ]
    }
  }

  if (errors) {
    this.model.dateOfBirth.errorMessage = {
      text: errors.output.payload.message
    }
  }
}

module.exports = ViewModel
