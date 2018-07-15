const {User, Pedestal, Record, Expire} = require('../models')
const {Run} = require('./pedestal')
const _check = require('./check')
const ejs = require('ejs')
const path = require('path')
const {sendMails} = require('./mail')

exports.start = async() => {
  let pedestal = await Pedestal.find({})
                               .populate('user')
  setTimeout(async () => {
    await pedestal.forEach(async (item) => {
      const {user, position, seat} = item
      await new Run({PHPSESSID: '', username: user.username, passwd: user.password, roomId: position, seatNum: seat}).run()
    })
  }, 4000)
  setTimeout(async() => {
    await pedestal.forEach(async (item) => {
      const {user, position, seat} = item
      await new Run({PHPSESSID: '', username: user.username, passwd: user.password, roomId: position, seatNum: seat}).run()
    })
  }, 1000 * 60 * 3)
  setTimeout(async () => {
    await pedestal.forEach(async (item) => {
      const {user} = item
      let state = await _check.checkPedstal(user.username, user.password)
      state = JSON.parse(state)
      let data = {}
      if (state.labe !== "undefined" && state.label === "fail") {
        data.label = 'fail'
        let record = new Record({user: user._id, label: data.label})
        await record.save()
      } else {
        const {studentId, seatNum, readRoom, bespeakTime} = state
        data.label = 'bespeak_success'
        let record = new Record({user: user._id, label: data.label, studentId, seatNum, readRoom, bespeakTime})
        await record.save()
      }
      const html = await ejs.renderFile(path.join(`${__dirname}`, '/html/app.html'), {data})
      sendMails(item.email, html)
    })
  }, 1000 * 60 * 6)
}