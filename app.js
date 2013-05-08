/**
 * 项目主程序
 */


var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path');

var app = express();

/**
 *  所有的环境设置
 */
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// 设置网站favicon.icon，放这里是为了不让这种请求记录在日志中
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('TODO-ADD-SECRET-STRING'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public'}));
app.use(express.static(path.join(__dirname, 'public'))); // 设置静态目录

// 开发环境设置
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
