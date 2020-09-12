var express = require("express");
var router = express.Router();

/* GET users listing. */

router.post("/", function (req, res, next) {
  if (req.user) return res.status(200).json(req.user);
  else return res.status(401).json({ message: "Not authorized" });
});
// router.get('/cool', function (req, res, next) {
//   res.send('Мы крутые');
// });
module.exports = router;
