var User = require('../models/user');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var async = require('async');

exports.index = function (req, res) {
    res.render('index', { title: 'Авторизация' });
}
exports.user_login_get = function (req, res) {
    res.render('auth_login', { title: 'Авторизация' });
}
exports.user_login_post = function (req, res) {
    res.render('auth_login', { title: 'Авторизация' });
}
exports.user_create_get = function (req, res, next) {
    res.render('auth_reg', { title: 'Регистрация' });
};

exports.user_create_post = function (req, res) {
    // Validate fields.
    body('login').isLength({ min: 2 }).trim().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
        body('password').isLength({ min: 2 }).trim().withMessage('Family name must be specified.')
            .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),

        // Sanitize fields.
        sanitizeBody('login').escape(),
        sanitizeBody('password').escape(),

        // Process request after validation and sanitization.
        (req, res, next) => {

            // Extract the validation errors from a request.
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                // There are errors. Render form again with sanitized values/errors messages.
                res.render('auth_reg', { title: 'Регистрация', user: req.body, errors: errors.array() });
                return;
            }
            else {
                // Data from form is valid.

                // Create an Author object with escaped and trimmed data.
                var user = new User(
                    {
                        login: req.body.login,
                        password: req.body.password
                    });
                user.save(function (err) {
                    if (err) { return next(err); }
                    // Successful - redirect to new author record.
                    res.redirect(author.url);
                });
            }
        }
    res.render('login', { title: 'Авторизация' });
}
exports.user_delete = function (req, res) {
    res.render('login', { title: 'Авторизация' });
}