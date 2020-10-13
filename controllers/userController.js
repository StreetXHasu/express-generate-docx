const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const Auth = require("../middleware/authenticateToken");
const path = require("path");

exports.user_login_post = function (req, res) {
  res.render("auth_login", { title: "Авторизация" });
};
exports.user_create_post = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // There are errors. Render form again with sanitized values/errors messages.
    res.json({ msg: "ошибка", user: req.body, errors: errors.array() });
    return;
  } else {
    // Data from form is valid.

    // Create an Author object with escaped and trimmed data.
    Auth.authReg(req.body.login, req.body.password);
  }

  res.json({ msg: "готово" });
};

exports.upload = function (req, res, next) {
  var filepath = path.join(__dirname, "../uploads/" + req.params.file);
  res.sendFile(filepath);
};
