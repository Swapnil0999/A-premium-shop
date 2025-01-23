const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();
router.get('/', (req, res) => {
  res.send("hey,it's working");
})
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
})
module.exports = router;