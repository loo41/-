const {User, Pedestal, Record, Expire} = require('../models')
const dayjs = require('dayjs')


exports.dealWithTime = async() => {
  pedestal = await Pedestal.find({})
  await pedestal.forEach(async (item, i) => {
    if (!item.type) await Pedestal.remove({_id: item._id})
    if (item.type === '1') {
      if (dayjs().isAfter(dayjs(item.time))) {
        await removeAnd(item)
      }
    } else if (item.type === '2') {
      if (dayjs().isAfter(dayjs(item.time[0])) || dayjs().isAfter(dayjs(item.time[1]))) {
        await removeAnd(item)
      }
    } else {
      if (await item.time.every(async (timer) => {
        if (dayjs().isAfter(dayjs(timer))) {
          return true
        }
        return false
      })){
        await removeAnd(item)
      }
    }
  })
}

async function removeAnd(item) {
  const pedestal = await Pedestal.findOneAndRemove({_id: item._id})
  const {user, type, position, email, seat, time} = pedestal
  let expire = new Expire({user, type, position, email, seat, time})
  await expire.save()
}