const { dog } = require('../../constants')

function ViewModel(error) {
  this.model = {
    formAction: dog.routes.addAnother,
    addAnother: {
      name: 'addAnother',
      fieldset: {
        legend: {
          text: 'Do you need to add another dog?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      items: [
        {
          value: 'yes',
          text: 'Yes'
        },
        {
          value: 'no',
          text: 'No'
        }
      ]
    }
  }

  if (error) {
    this.model.addAnother.errorMessage = {
      text: 'Select if you need to add another dog.'
    }
  }
}

module.exports = ViewModel
