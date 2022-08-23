const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Admin = require("../../models/adminModel");
const User = require('../../models/userModel')
const expressAsyncHandler = require("express-async-handler");
const { generateAccessToken } = require("./Authorization");
const { createError } = require("../../createError");
const bcrypt = require("bcrypt");
dotenv.config();

module.exports = {
  Login: expressAsyncHandler(async (req, res, next) => {
    let { data } = req.body;

    let admin = await Admin.findOne({ Email: data.Email });
    if (admin) {
      let response = await bcrypt.compare(data.Password, admin.Password);
      if (response) {
        const admins = { email: data.Email };
        const accessToken = generateAccessToken(admins);
        const refreshToken = jwt.sign(admins, process.env.REFRESH_TOKEN_SECRET);
        await Admin.updateOne({ _id: admin._id }, { $set: { refreshToken } });
        res.cookie("accessToken", accessToken, {
          maxAge: 6000,
          httpOnly: true,
        });
        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        res.cookie("adminId", admin._id, { httpOnly: true });
        return res.status(200).json("successfully login");
      } else {
        return next(createError(401, "password not match"));
      }
    } else {
      return next(createError(404, "Data not getting"));
    }
  }),

  getData: expressAsyncHandler(async (req, res, next) => {
   let data =await User.find()
   if(data) {
    res.status(200).json(data)
   }else {
    return next(createError(404, 'data not found'))
   }
  }),

  Logout:expressAsyncHandler(async (req, res, next) => {
    let id = req.cookies.adminId
    console.log(id)
     let response = await Admin.findByIdAndUpdate(id,{$unset:{refreshToken:""}})
     res.status(200).json('logout success')
   })


};
