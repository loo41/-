const _expire = require('./expire')
const _start = require('./start')
const schedule = require("node-schedule")

schedule.scheduleJob('0 0 1 * * *', function() {
  _expire.dealWithTime()
})
schedule.scheduleJob('1 30 12 * * *', function() {
  _expire.dealWithTime()
})
schedule.scheduleJob('0 0 12 * * *', function() {
  _start.start()
})
