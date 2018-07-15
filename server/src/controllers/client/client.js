const {User, Pedestal, Record, Expire} = require('../../models')
const _token = require('../../utils/token')
const _check = require('../../utils/check')
const {Run} = require('../../utils/pedestal')

exports.login = async (ctx) => {
  const {username, password} = ctx.request.body
  let user = await User.find({username, password})
  if (user.length <= 0) {
    if (!await _check.account(username, password)) {
      ctx.body = {code: 501}
      return
    }
    let user = new User({username, password})
    let _id = user._id
    let token = await _token.creatToken({_id})
    await user.save()
    let state = await _check.checkPedstal(username, password)
    state = JSON.parse(state)
    ctx.body = {code: 200, token, state}
    return
  }
  let token = await _token.creatToken({_id: user[0]._id})
  let state = await _check.checkPedstal(username, password)
  state = JSON.parse(state)
  ctx.body = {code: 200, token, state}
}

exports.submit = async (ctx) => {
  const {pedestal, dateArray, dateType, radioType, position} = ctx.request.body
  let user = await _token.istoken(ctx)
  const {email, seat, startDate, endDate} = pedestal
  const {_id} = user
  let dp = await User.findOne({_id})
  if (radioType === '2') {
    await new Run({PHPSESSID: '', username: dp.username, passwd: dp.password, roomId: position, seatNum: seat}).run()
    let state = await _check.checkPedstal(dp.username, dp.password)
    state = JSON.parse(state)
    ctx.body = {code: 200, state}
    return
  }
  let ped = null
  if (dateType === '1') {
    ped = new Pedestal({user: _id, type: dateType, position, email, seat, time: startDate})
  } else if (dateType === '2') {
    ped = new Pedestal({user: _id, type: dateType, position, email, seat, time: [startDate, endDate]})
  } else {
    ped = new Pedestal({user: _id, type: dateType, position, email, seat, time: dateArray})
  }
  ctx.body = {code: 200}
  await ped.save()
}

exports.format = async (ctx) => {
  let user = await _token.istoken(ctx)
  const {_id} = user
  await Promise.all([User.remove({_id}), Pedestal.remove({user: _id}),  Expire.remove({user: _id}), Record.remove({user: _id})])
  ctx.body = {code: 200}
}


exports.record = async (ctx) => {
  let user = await _token.istoken(ctx)
  const {_id} = user
  let [pedestal, record, expire] = await Promise.all([Pedestal.find({user: _id}), Record.find({user: _id}), Expire.find({user: _id})])
  let success = []
  let flag = []
  await record.forEach(async (item, i) => {
    if (item.label === 'bespeak_success') {
      flag.push(i)
    }
  })
  flag.sort((x, y) => y - x)
  flag.forEach(async(item, i) => {
    let less = record.splice(item, 1)
    await success.push(less[0])
  })
  ctx.body = {code: 200, data: [pedestal, expire, success, record]}
}

exports.cancel = async(ctx) => {
  let user = await _token.istoken(ctx)
  const {_id} = user
  let info = await User.findOne({_id})
  await _check.cancel(info.username, info.password)
  ctx.body = {code: 200}
}

exports.remove = async(ctx) => {
  let {_id} = ctx.query
  await Pedestal.remove({_id})
  ctx.body = {code: 200}
}