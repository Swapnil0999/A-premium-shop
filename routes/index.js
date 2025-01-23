const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const productmodel = require('../models/productmodel');
const usermodel = require('../models/usermodel');
const router = express.Router();
router.get('/', (req, res) => {
  let error = req.flash("error");
  res.render('index', { error, loggedin: false });
})
router.get('/shop', isLoggedIn, async (req, res) => {
  let success = req.flash("success");
  let products = await productmodel.find();
  res.render('shop', { products, success });
})
router.get('/cart', isLoggedIn, async (req, res) => {
  let user = await usermodel.findOne({ email: req.user.email }).populate("cart");
  res.render("cart", { user });
})
router.get("/addtocart/:id", isLoggedIn, async (req, res) => {

  let user = await usermodel.findOne({ email: req.user.email });
  user.cart.push(req.params.id);
  await user.save();
  req.flash("success", "Added to cart");
  res.redirect("/shop");
})
module.exports = router;
