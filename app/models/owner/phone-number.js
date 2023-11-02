const { owner } = require('../../constants')

function ViewModel (value, error) {
  this.model = {
    formAction: owner.routes.phone,
    backLink: owner.routes.dateOfBirth,
    phoneNumber: {
      label: {
        text: 'What is your phone number?',
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      hint: {
        text: 'You can provide either a home or mobile phone number.'
      },
      id: 'phone',
      name: 'phone',
      type: 'tel',
      autocomplete: 'tel',
      classes: 'govuk-input--width-20',
      value
    }
  }

  if (error) {
    this.model.phoneNumber.errorMessage = {
      text: 'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192'
    }
  }
}

module.exports = ViewModel
