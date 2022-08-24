const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema(
  {
    Email: { type: String, required: true },
    Password: {type: String, required: true},
    refreshToken: {type: String}
  },
  { collection: 'adminData' }
)

const model = mongoose.model('adminData', adminSchema)

module.exports = model