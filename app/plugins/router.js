const routes = [].concat(
  require('../routes/assets'),
  require('../routes/index'),
  require('../routes/name'),
  require('../routes/owner-dob'),
  require('../routes/postcode'),
  require('../routes/select-address'),
  require('../routes/address'),
  require('../routes/phone'),
  require('../routes/dog-breed'),
  require('../routes/dog-name'),
  require('../routes/dog-dob'),
  require('../routes/confirmation'),
  require('../routes/microchipped'),
  require('../routes/microchip-number'),
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/cookies'),
  require('../routes/summary'),
  require('../routes/email')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, _) => {
      server.route(routes)
    }
  }
}
