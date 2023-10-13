function ViewModel (value, error) {
  this.model = {
    name: 'preference',
    fieldset: {
      legend: {
        text: 'Do you want to keep the dog?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    items: [
      {
        value: 'Keep',
        text: 'Yes',
        hint: {
          text: 'I want to keep my dog'
        },
        checked: value === 'Keep'
      },
      {
        value: 'Compensation',
        text: 'No',
        hint: {
          text: 'I want to apply for compensation'
        },
        checked: value === 'Compensation'
      }
    ]
  }

  if (error) {
    this.model.errorMessage = {
      text: 'Select if your dog is preference.'
    }
  }
}

module.exports = ViewModel
