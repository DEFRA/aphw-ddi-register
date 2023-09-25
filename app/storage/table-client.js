const { DefaultAzureCredential } = require('@azure/identity')
const { TableClient } = require('@azure/data-tables')
const storageConfig = require('../config/storage')

let tableClient

const initialiseTables = async () => {
  if (storageConfig.useConnectionString) {
    console.log('Using connection string for Table Client')
    tableClient = TableClient.fromConnectionString(storageConfig.connectionString, storageConfig.registrationTable, { allowInsecureConnection: true })
  } else {
    console.log('Using DefaultAzureCredential for Table Client')
    tableClient = new TableClient(`https://${storageConfig.account}.table.core.windows.net`, storageConfig.registrationTable, new DefaultAzureCredential())
  }
  console.log('Making sure tables exist')
  await tableClient.createTable(storageConfig.registrationTable)
}

const getClient = () => {
  return tableClient
}

module.exports = {
  initialiseTables,
  getClient
}
