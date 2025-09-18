var express = require("express");
var router = express.Router();

router.use('/users',require('./users'))
router.use('/friends',require('./friends'))
router.use('/messages',require('./messages'))




module.exports = router;
