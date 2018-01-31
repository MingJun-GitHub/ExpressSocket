var express = require('express');
var path = require('path');
var app = express();

var ejs = require('ejs');

/* 设置view层 */

app.set('views', path.resolve(__dirname, 'views'))
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

/* 配置静态文件 */

app.use('/static', express.static('static'))

/* 端口 */
var port = process.env.PORT || 2000

// app.use('/s', require('./router/index'))  

app.get('/', function (req, res) {
    res.render('index', {title: 'ExpressSocket'});
});

app.get('/upload', function(req, res) {
    res.render('upload', {title: '上传图片'})
})


app.use('/socket', require('./router/index'));

app.listen(port, function () {
    console.log(`this server running ${port}...`);
})


