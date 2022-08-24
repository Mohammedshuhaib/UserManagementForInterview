const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Password: {type: String, required: true},
    refreshToken: {type: String}
  },
  { collection: 'userData' }
)

const model = mongoose.model('userData', userSchema)

module.exports = model