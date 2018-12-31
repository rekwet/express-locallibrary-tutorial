//load Express
let express = require('express');
//get router object
let router = express.Router();

//specify route
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool', function(req, res, next) {
  res.send("You're so cool");
});

//export the router; to be imported by ../app.js
module.exports = router;
