var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const routes = require("./routes");
var app = express();
var http = require('http');
let  startWebSocket  = require('./websocket/server')
var server = http.createServer(app);
var usersRouter = require('./routes/users');


require('./websocket/server')(server);

const allowedOrigin = "https://project-fron-git-main-xue-d11ae8a6.vercel.app"|| "project-fron.vercel.app" || "http://localhost:3000";

app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));
// 启动 WebSocket 服务
app.use('/', routes);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);

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
