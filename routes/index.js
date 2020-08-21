var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');

/* GET home page. */
router.get('/', function (req, res) {
  res.json({ msg: 'лол, это главная' });
});
router.post('/login', user_controller.user_login_post);
router.post('/reg', user_controller.user_create_post);

module.exports = router;
