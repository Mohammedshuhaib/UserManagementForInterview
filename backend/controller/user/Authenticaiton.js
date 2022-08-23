const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../../models/userModel");
const expressAsyncHandler = require("express-async-handler");
const { generateAccessToken } = require("./Authorization");
const { createError } = require("../../createError");
const bcrypt = require("bcrypt");
dotenv.config();

module.exports = {
  Register: expressAsyncHandler(async (req, res, next) => {
    let { data } = req.body;
    const user = await User.findOne({ Email: data.Email });
    if (user) {
      return next(createError(409, "Email address already exist"));
    } else {
      data.Password = await bcrypt.hash(data.Password, 10);
      let resp = await User.create({ ...data });
      return res.status(200).json({ message: "Success" });
    }
  }),

  Login: expressAsyncHandler(async (req, res, next) => {
    const { data } = req.body;
    let user = await User.findOne({ Email: data.Email });
    if (user) {
      const response = await bcrypt.compare(data.Password, user.Password);
      if (response) {
        const users = { name: data.Name };
        const accessToken = generateAccessToken(users);
        const refreshToken = jwt.sign(users, process.env.REFRESH_TOKEN_SECRET);
        await User.updateOne({ _id: user._id }, { $set: { refreshToken } });
        res.cookie("accessToken", accessToken, {
          maxAge: 6000,
          httpOnly: true,
        });
        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        res.cookie("userId", user._id, { httpOnly: true });
        return res.status(200).json("successfully login");
      } else {
        return next(createError(401, "password not match"));
      }
    } else {
      return next(createError(404, "Data not getting"));
    }
  }),

  Logout:expressAsyncHandler(async (req, res, next) => {
    let id = req.cookies.userId
    let response = await User.updateOne({_id:userId})
    res.status(200).json({'logout success'})
  })
};
