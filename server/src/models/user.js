const moogose = require('mongoose');
const Schema = moogose.Schema;

const userSchema = new Schema({
    username: {type: String, index: true},
    password: {type: String, index: true},
})

const User = moogose.model('user', userSchema)

module.exports = User