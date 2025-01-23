const cookieParser = require('cookie-parser');
const express = require('express');
require('dotenv').config();
const path = require('path');
const db = require('./config/mongoose-connection');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const index = require('./routes/index');
const productsRouter = require('./routes/productsRouter');
const expressSession = require('express-session');
const flash = require('connect-flash')
const app = express();


app.use(cookieParser());
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.EXPRESS_SESSION_SECRET,
}))
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/', index);
app.use('/users', usersRouter);
app.use('/owners', ownersRouter);
app.use('/products', productsRouter);


app.listen(3000);