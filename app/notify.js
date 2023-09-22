const config = require('./config').notify
const NotifyClient = require('notifications-node-client').NotifyClient

const notifyClient = new NotifyClient(config.apiKey)

const sendEmail = async (emailAddress, personalisation) => {
  try {
    await notifyClient.sendEmail(config.templateId, emailAddress, { personalisation })
  } catch (err) {
    console.log(err.response.data)
  }
}

module.exports = sendEmail
