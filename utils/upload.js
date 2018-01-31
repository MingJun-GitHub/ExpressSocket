var multer = require('multer');
var md5 = require('md5');
var config = require('./config');

var storage = multer.diskStorage({
    destination: config.upload.path,
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split('.');
        // file.fieldname + '-'
        cb(null, md5(file) + (new Date().getTime()) + '.' + fileFormat[fileFormat.length - 1]);
    }
});

var upload = multer({
    storage: storage,
    //limits:{}
});
module.exports = upload;