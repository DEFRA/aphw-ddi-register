const { owner } = require('../../constants')

const errorMessages = {
  firstName: 'Enter a first name',
  lastName: 'Enter a last name'
}

function ViewModel (name, errors) {
  this.model = {
    formAction: owner.routes.name,
    backLink: '/',
    name: {
      title: {
        label: {
          text: 'Title'
        },
        id: 'title',
        name: 'title',
        classes: 'govuk-!-width-one-quarter',
        value: name.title
      },
      firstName: {
        label: {
          text: 'First name'
        },
        id: 'firstName',
        name: 'firstName',
        classes: 'govuk-!-width-one-half',
        value: name.firstName
      },
      lastName: {
        label: {
          text: 'Last name'
        },
        id: 'lastName',
        name: 'lastName',
        classes: 'govuk-!-width-one-half',
        value: name.lastName
      },
      errors: []
    }
  }

  if (errors) {
    for (const error of errors.details) {
      const field = error.path[0]

      const prop = this.model.name[field]

      if (prop !== undefined) {
        prop.errorMessage = {
          text: errorMessages[field]
        }

        this.model.name.errors.push({
          text: errorMessages[field],
          href: `#${field}`
        })
      }
    }
  }
}

module.exports = ViewModel
