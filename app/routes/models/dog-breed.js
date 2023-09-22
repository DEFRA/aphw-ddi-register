function ViewModel (dogBreed, error) {
  this.model = {
    name: 'dogbreed',
    fieldset: {
      legend: {
        text: 'Select you dog breed?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    items: [
      {
        value: 'dog1',
        text: 'Dog 1',
        checked: dogBreed === 'dog1'
      },
      {
        value: 'dog2',
        text: 'Dog 2',
        checked: dogBreed === 'dog2'
      },
      {
        value: 'dog3',
        text: 'Dog 3',
        checked: dogBreed === 'dog3'
      },
      {
        value: 'dog4',
        text: 'Dog 4',
        checked: dogBreed === 'dog4'
      }
    ]
  }

  if (error) {
    this.model.errorMessage = {
      text: 'Select a dog breed.'
    }
  }
}

module.exports = ViewModel
