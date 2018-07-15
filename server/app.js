const koa = require('koa');
const koaBody = require('koa-body');
const static = require('koa-static');
const config = require('config');
const app = new koa();
require('./src/utils/timeWork');

const router = require('./src/router');

const mongoose = require('mongoose');
mongoose.connect(config.get('mongodb'));
mongoose.Promise = global.Promise;

app.use(static(`${__dirname}/views`));
  
app.use(async(ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.error(err);
    }
});

app.use(koaBody());

app.use(async function(ctx, next) {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Accept,Origin,token");
    ctx.set("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, OPTIONS");
    ctx.set("X-Powered-By",' 3.2.1')
    ctx.set("Content-Type", "application/json;charset=utf-8");
    await next()
});

app
    .use(router.routes())
    .use(router.allowedMethods());



module.exports = app

