var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 로그인
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 로그인
// Express 객체를 생성한 후에, express에서 passport를 initialize하고, 
// passport에서 session을 사용하도록 설정
app.use(session({secret: 'secret MEAN Shopping Mall'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// passport config
var Account = require('./models/account');
// passport의 LocalStrategy를 정의하고, 
// Local Strategy에 의해서 인증시에 호출되는 인증 메서드를 정의
// 실제로 사용자 인증을 수행하게 된다
passport.use(new LocalStrategy(Account.authenticate()));
// 로그인이 성공하면, serializeUser 메서드를 이용하여 사용자 정보를 Session에 저장
passport.serializeUser(Account.serializeUser());
// node.js의 모든 페이지에 접근할때, 
// 로그인이 되어 있을 경우 모든 사용자 페이지를 접근할 경우 deserilizeUser가 발생
// deserializeUser에서는 session에 저장된 값을 이용해서, 사용자 Profile을 찾은 후, 
// HTTP Request의 리턴
passport.deserializeUser(Account.deserializeUser());

module.exports = app;
