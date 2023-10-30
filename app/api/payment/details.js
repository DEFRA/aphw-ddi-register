const config = require('../../config').govPay
const { get } = require('./base')

const paymentDetails = async (id) => {
  return get(`${config.paymentApiUrl}/${id}`, config.paymentApiKey)
}

module.exports = paymentDetails
