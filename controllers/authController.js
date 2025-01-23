const userModel = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { generateToken } = require('../utils/generateToken');
module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, fullname } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      req.flash("error", "you already have an account, please login");
      return res.redirect('/');
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) res.send(err.message);
        else {
          let user = await userModel.create({ email, password: hash, fullname });
          let token = generateToken(user);
          res.cookie('token', token);
          res.send("user created successfully");
        }

      })
    })



  } catch (error) {
    res.send(error.message);
  }


}

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      req.flash("error", "Email or password is invalid")
      return res.redirect('/');
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        return res.redirect('/shop');
      }
      else {
        req.flash("error", "Email or password is invalid")
        return res.redirect('/');
      }
    });

  }
  catch (error) {
    return res.send(error.message);
  }
}