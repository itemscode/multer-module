var express = require('express');
let multer = require('multer');
var router = express.Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
          cb(null,'uploads/')
      },
  filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
      }
})
let storageUpload = multer({storage});

let destUpload = multer({dest:'uploads/'});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/single', destUpload.single('multer'), function(req, res) {
  res.send(req.file);
});

router.post('/single/name', storageUpload.array('multerName'), function(req, res) {
  res.send(req.files);
});

router.post('/multi', destUpload.fields([{name:'one'},{name:'two'},{name:'three'}]), function(req, res) {
  res.send(req.files);
});

router.post('/multi/name', storageUpload.fields([{name:'oneName'},{name:'twoName'},{name:'threeName'}]), function(req, res) {
  res.send(req.files);
});

module.exports = router;
