var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var makananListingRouter = require('./routes/makanan_list');
var perusahaanListingRouter1 = require('./routes/perusahaan_indofood');
var perusahaanListingRouter2 = require('./routes/perusahaan_Mayoran');
var perusahaanListingRouter3 = require('./routes/perusahaan_Garudafood');
var perusahaanListingRouter4 = require('./routes/perusahaan_Multibintang');
var kategoriListingRouter1 = require('./routes/kategori_noodles');
var kategoriListingRouter2 = require('./routes/kategori_dairy');
var kategoriListingRouter3 = require('./routes/kategori_snack');
var kategoriListingRouter4 = require('./routes/kategori_sweet');
var kategoriListingRouter5 = require('./routes/kategori_beverages');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/', indexRouter);
app.use('/list', makananListingRouter);
app.use('/indofood', perusahaanListingRouter1);
app.use('/mayoran', perusahaanListingRouter2);
app.use('/garudafood', perusahaanListingRouter3);
app.use('/multibintang', perusahaanListingRouter4);
app.use('/noodles', kategoriListingRouter1);
app.use('/dairy', kategoriListingRouter2);
app.use('/snack', kategoriListingRouter3);
app.use('/sweet', kategoriListingRouter4);
app.use('/beverages', kategoriListingRouter5);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
