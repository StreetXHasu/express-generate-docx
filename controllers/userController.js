const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const Auth = require("../middleware/authenticateToken");
const path = require("path");

exports.user_login_post = function (req, res, next) {
  Auth.authLogin(req, res, next);
  // res.render("auth_login", { title: "Авторизация" });
};
exports.user_create_post = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // There are errors. Render form again with sanitized values/errors messages.
    res.json({ error: "ошибка", user: req.body, errors: errors.array() });
    return;
  } else {
    // Data from form is valid.

    // Create an Author object with escaped and trimmed data.
    if (Auth.authReg(req.body.userlogin, req.body.userpassword)) {
      res.json({ success: "Ваша учётная запись успешно создана." });
    } else {
      res.json({ error: "Ошибка" });
    }
  }
};

exports.upload = function (req, res, next) {
  var filepath = path.join(__dirname, "../uploads/" + req.params.file);
  res.sendFile(filepath);
};
