const routes = [].concat(
  require('../routes/assets'),
  require('../routes/index'),
  require('../routes/register/name'),
  require('../routes/register/date-of-birth'),
  require('../routes/register/postcode'),
  require('../routes/register/select-address'),
  require('../routes/register/address'),
  require('../routes/register/phone-number'),
  require('../routes/dog/name'),
  require('../routes/dog/date-of-birth'),
  require('../routes/dog/colour'),
  require('../routes/dog/gender'),
  require('../routes/register/confirmation'),
  require('../routes/dog/microchipped'),
  require('../routes/dog/microchip-number'),
  require('../routes/dog/preference'),
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/cookies'),
  require('../routes/register/summary'),
  require('../routes/register/email')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, _) => {
      server.route(routes)
    }
  }
}
