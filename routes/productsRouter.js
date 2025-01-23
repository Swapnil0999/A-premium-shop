const express = require('express');
const upload = require("../config/multer-config");
const productModel = require("../models/productmodel");
const router = express.Router();
router.post('/create', upload.single("image"), async (req, res) => {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    let product = await productModel.create({
      image: req.file.buffer,
      name, price, bgcolor, discount, panelcolor, textcolor,
    });
    req.flash("success", "product created successfully");
    res.redirect("/owners/admin");
  } catch (error) {
    res.send(error.message);
  }
})
module.exports = router;