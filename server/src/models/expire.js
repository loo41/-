const moogose = require('mongoose');
const Schema = moogose.Schema;

const expireSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    type: String,                                              // 定于预约时间类型
    position: String,                                          // 预约楼类型
    email: String,
    seat: String,
    time: Schema.Types.Mixed
})

const Expire = moogose.model('expire', expireSchema)

module.exports = Expire