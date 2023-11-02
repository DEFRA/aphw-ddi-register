const constants = {
  routes: {
    name: '/register/name',
    postcode: '/register/postcode',
    selectAddress: '/register/select-address',
    address: '/register/address',
    dateOfBirth: '/register/date-of-birth',
    phone: '/register/phone-number',
    email: '/register/email',
    summary: '/register/summary',
    payment: '/register/payment',
    paymentSuccessful: '/register/confirmation',
    paymentFailed: '/register/payment-failed',
    paymentReturn: '/register/payment-return',
    confirmation: '/register/confirmation'
  },
  views: {
    name: 'register/name',
    postcode: 'register/postcode',
    selectAddress: 'register/select-address',
    address: 'register/address',
    dateOfBirth: 'register/date-of-birth',
    phone: 'register/phone-number',
    email: 'register/email',
    summary: 'register/summary',
    payment: 'register/payment',
    paymentFailed: 'register/payment-failed',
    confirmation: 'register/confirmation'
  },
  keys: {
    entry: 'register',
    name: 'name',
    dateOfBirth: 'dateOfBirth',
    phone: 'phone',
    address: 'address',
    email: 'email',
    paymentId: 'paymentId',
    registrationId: 'registrationId',
    paymentSuccessful: 'paymentSuccessful'
  }
}

module.exports = constants
