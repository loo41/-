const {
  getPHPSESSID,
  login,
  checkSeat,
  SignOutSeat
} = require('../api')

exports.account = async (username, passwd) => {
  let PHPSESSID = await getPHPSESSID()
  let flag = await login({username, passwd, PHPSESSID})
  if (flag === 'success') return true
  return false
}

exports.checkPedstal = async (username, passwd) => {
  let PHPSESSID = await getPHPSESSID()
  await login({username, passwd, PHPSESSID})
  return await checkSeat({PHPSESSID})
}

exports.cancel = async (username, passwd) => {
  let PHPSESSID = await getPHPSESSID()
  await login({username, passwd, PHPSESSID})
  await SignOutSeat({PHPSESSID})
}