const config = require('../config').notify
const NotifyClient = require('notifications-node-client').NotifyClient

const notifyClient = new NotifyClient(config.apiKey)

const sendEmail = async (templateId, emailAddress, personalisation) => {
  return notifyClient.sendEmail(templateId, emailAddress, personalisation)
}

module.exports = sendEmail
