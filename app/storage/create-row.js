const { getClient } = require('./table-client')

const createRow = async (partitionKey, rowKey, registration) => {
  const entity = {
    partitionKey,
    rowKey,
    data: registration ? JSON.stringify(registration) : undefined
  }

  const client = getClient()
  await client.createEntity(entity)
}

module.exports = {
  createRow
}
