const routes = [].concat(
  require('../routes/assets'),
  require('../routes/index'),
  require('../routes/owner/name'),
  require('../routes/owner/date-of-birth'),
  require('../routes/owner/postcode'),
  require('../routes/owner/select-address'),
  require('../routes/owner/address'),
  require('../routes/owner/phone-number'),
  require('../routes/dog/name'),
  require('../routes/dog/date-of-birth'),
  require('../routes/dog/colour'),
  require('../routes/dog/gender'),
  require('../routes/owner/confirmation'),
  require('../routes/dog/microchipped'),
  require('../routes/dog/microchip-number'),
  require('../routes/dog/add-another'),
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/cookies'),
  require('../routes/owner/summary'),
  require('../routes/owner/email')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, _) => {
      server.route(routes)
    }
  }
}
