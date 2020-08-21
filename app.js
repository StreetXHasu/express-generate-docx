const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const docsRouter = require('./routes/docs');

const Auth = require('./middleware/authenticateToken.js');

const app = express();

const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://streetx:UuTi7snfMFMD8NSg@hasu.rh7fx.mongodb.net/test';//замените url!!!
mongoose.connect(mongoDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//наше уг
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
//авторизация
app.use(Auth.authVerify)
app.use('/api/auth', Auth.authLogin);


app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/docs', docsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
