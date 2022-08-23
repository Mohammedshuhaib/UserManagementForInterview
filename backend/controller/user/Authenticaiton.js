const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../../models/userModel");
const expressAsyncHandler = require("express-async-handler");
const { generateAccessToken } = require('./Authorization')
const {createError} = require('../../createError')
dotenv.config();

module.exports = {
  Register: expressAsyncHandler(async (req, res, next) => {
    let {data} = req.body;
    const user = await User.findOne({ Email: data.Email})
    if (user) {
      return next(createError(409, "Email address already exist"));
    } else {
      const user = { name: data.Name };
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
     let resp = await User.create({ ...data, refreshToken });
      res.cookie('accessToken', accessToken, { maxAge: 6000, httpOnly: true })
      res.cookie('refreshToken', refreshToken, { httpOnly: true })
      res.cookie('uerId', resp._id, { httpOnly: true })
      return res.status(200).json({ message: 'Success' })
    }
  }),
};
