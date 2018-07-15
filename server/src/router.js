const Router = require('koa-router');
const controller = require('./controllers');

const router = new Router({
  prefix: '/pedestal'
});

const { _Client } = controller

router
      .post('/login', _Client.login)
      .post('/submit', _Client.submit)
      .get(`/format`, _Client.format)
      .get(`/pedestal-record`, _Client.record)
      .get(`/cancel-ped`, _Client.cancel)
      .get(`/remove-ped`, _Client.remove)




module.exports = router