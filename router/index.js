var express = require('express');
var router = express.Router();
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var upload = require('../utils/upload')
var url = require('url')

var i = 0

io.on('connection', function(socket){
    console.log('用户已经进入');
    socket.on('disconnect', function() {
        console.log('用户已经离开');
    });
    socket.on('message', function(obj) {
        io.emit('message', obj);
    });
});
//开启端口监听socket
server.listen(2001);

router.post('/upload', upload.single('avatar'), function(req, res, next) {
    //console.log('res', res)
    if (req.file){
        res.json({
            code: '0000',
            msg: 'upload success',
            url: '//' + req.headers.host + '/static/image/' + req.file.filename
        })
        io.sockets.emit('message', {
            type: 1,
            text: '',
            imgurl: '//' + req.headers.host + '/static/image/' + req.file.filename
        })
    } else {
        res.json({
            code: '-1',
            msg:'upload faild',
            url:''
        })
    }
})

module.exports = router;