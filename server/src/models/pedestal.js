const moogose = require('mongoose');
const Schema = moogose.Schema;

const pedestalSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    type: String,                                              // 定于预约时间类型
    position: String,                                          // 预约楼类型
    email: String,
    seat: String,
    time: Schema.Types.Mixed
})

const Pedestal = moogose.model('pedestal', pedestalSchema)

module.exports = Pedestal