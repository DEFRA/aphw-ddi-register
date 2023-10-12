function ViewModel (value, error) {
  this.model = {
    label: {
      text: 'What is your telephone number?',
      classes: 'govuk-label--l',
      isPageHeading: true
    },
    id: 'phone',
    name: 'phone',
    type: 'tel',
    autocomplete: 'tel',
    classes: 'govuk-input--width-20',
    value
  }

  if (error) {
    this.model.errorMessage = {
      text: 'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192'
    }
  }
}

module.exports = ViewModel
