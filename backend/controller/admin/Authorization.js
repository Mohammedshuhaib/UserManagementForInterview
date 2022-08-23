const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const Admin = require('../../models/adminModel')
const expressAsyncHandler = require('express-async-handler')
const createError = require('../../createError')
dotenv.config()
module.exports = {

  Token: expressAsyncHandler(async (req, res, next) => {
    const { refreshToken, adminId } = req.cookies
    if (!refreshToken) return next(createError(401, 'token not found'))
    const checkToken = await Admin.findOne({ _id: adminId, refreshToken })
    if (!checkToken) return next(createError(401, 'token does not match'))
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, admin) => {
      if (err) return next(createError(403, 'Token not verified'))
      const accessToken = this.generateAccessToken({ name: admin.name })
      res.cookie('accessToken', accessToken, { maxAge: 9000, http: true })
    })
  }),

  generateAccessToken: (admin) => {
    return jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
  }

}
