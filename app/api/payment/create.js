const { post } = require('./base')
const config = require('../../config').govPay

const createPayment = async (payload) => {
  const payment = {
    amount: config.paymentValue,
    reference: payload.reference,
    description: 'Registeration fee',
    prefilled_cardholder_details: {
      cardholder_name: payload.name,
      billing_address: {
        line1: payload.address.addressLine1,
        line2: payload.address.addressLine2,
        city: payload.address.town,
        postcode: payload.address.postcode
      }
    },
    email: payload.email,
    return_url: config.paymentReturnUrl,
    language: 'en'
  }

  return post(config.paymentApiUrl, payment, config.paymentApiKey)
}

module.exports = createPayment
