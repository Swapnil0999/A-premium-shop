const express = require('express');

const router = express.Router();
const ownerModel = require('../models/ownermodel');
if (process.env.NODE_ENV === "development") {
  router.post('/create', async (req, res) => {

    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(500).send("You don't have permission to create a owner");
    }
    let { fullname, email, password } = req.body;
    let created_owner = ownerModel.create({
      fullname,
      email,
      password
    });
    res.status(202).send(created_owner);

  })
}
router.get('/', (req, res) => {
  res.send("hey,it's working");
})
router.get('/admin', (req, res) => {
  let success = req.flash("success");
  res.render("createproducts", { success });
})


module.exports = router;