const moogose = require('mongoose');
const Schema = moogose.Schema;

const recordSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    label: String,                                                // 定于预约时间类型
    studentId: String,
    seatNum: String,
    readRoom: String,
    bespeakTime: String
})

const Record = moogose.model('record', recordSchema)

module.exports = Record