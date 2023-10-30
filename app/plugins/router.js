const routes = [].concat(
  require('../routes/assets'),
  require('../routes/index'),
  require('../routes/register/owner/name'),
  require('../routes/register/owner/date-of-birth'),
  require('../routes/register/owner/postcode'),
  require('../routes/register/owner/select-address'),
  require('../routes/register/owner/address'),
  require('../routes/register/owner/phone-number'),
  require('../routes/register/owner/email'),
  require('../routes/register/dog/name'),
  require('../routes/register/dog/date-of-birth'),
  require('../routes/register/dog/colour'),
  require('../routes/register/dog/gender'),
  require('../routes/register/dog/neutered'),
  require('../routes/register/dog/microchipped'),
  require('../routes/register/dog/microchip-number'),
  require('../routes/register/dog/add-another'),
  require('../routes/register/summary'),
  require('../routes/register/confirmation'),
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/cookies')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, _) => {
      server.route(routes)
    }
  }
}
