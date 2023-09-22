function ViewModel (value, error) {
  this.model = {
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
        value: 'yes',
        text: 'Yes',
        checked: value === 'yes'
      },
      {
        value: 'no',
        text: 'No',
        checked: value === 'no'
      }
    ]
  }

  if (error) {
    this.model.errorMessage = {
      text: 'Select if your dog is microchipped.'
    }
  }
}

module.exports = ViewModel
