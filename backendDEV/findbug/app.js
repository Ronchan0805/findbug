var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var dangerRouter = require('./routes/secret/index.js');

var app = express();

/**
 * 设置为线上环境
 * req.app.get('env')可获取当前开发环境 - development|production
 */
// app.set('env', 'production');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 需要安全性验证的接口
app.use('/danger',dangerRouter);

/**
 *  关于错误处理:
 *  HTTP请求状态码统一为200,在res返回值里会返回实际状态码
 */
// catch 404 and forward to error handler
 app.use(function(req, res, next) {
  next(createError(404));
});
/**
 * error handler
 * 与其他app.use()不同的是，当函数接受四个参数时，该函数就被标识为错误处理中间件函数
 */
app.use(function(err, req, res, next) {
  // return Error
  res.json({
    code: err.status || 500,
    data: req.app.get('env'),
    msg: err.message
  })
});

module.exports = app;
