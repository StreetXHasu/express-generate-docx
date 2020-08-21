const jwt = require("jsonwebtoken");
const db = require('../models');
const tokenKey = '1a2b-3c4d-5e6f-7g8h'
const bcrypt = require('bcrypt');
const moment = require('moment');
const saltRounds = 10;


module.exports = {

  async authLogin(req, res, next) {

    try {
      //console.log('Тест работает');
      const myPlaintextPassword = req.body.password;

      let user = await db.User.findOne({
        where: {
          user_login: req.body.login
        }
      })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      let check = await bcrypt.compare(myPlaintextPassword, user.user_password);
      if (check) {
        let token = jwt.sign({ id: user.id }, tokenKey);
        const [dbuser, created] = await db.User_session.findOrCreate({
          where: {
            userId: user.id,
          },
          defaults: {
            token: token,
            end: `${moment().add(1, 'd').format("YYYY-MM-DD HH:mm:ss.SSS Z")}`
          }
        })
        // console.log(user.user_name); // 'sdepold'
        // console.log(created); // The boolean indicating whether this instance was just created
        // if (created) {
        //   console.log(user.user_password); // This will certainly be 'Technical Lead JavaScript'
        // }

        return res.status(200).json({
          id: user.id,
          login: user.user_login,
          token: token
        })
      }


      // if (req.body.login === user.login && req.body.password === user.password) {
      //   return res.json({
      //     id: user.id,
      //     login: user.login,
      //     token: jwt.sign({ id: user.id }, tokenKey)
      //   })
      // }

    } catch (error) {
      console.log(error)

    }
    return res.status(404).json({ message: 'User not found' })
  },

  authVerify(req, res, next) {

    //TODO сделать эту проверку
    //   const token = authHeader && authHeader.split(" ")[1];
    if (req.headers.authorization) {
      jwt.verify(req.headers.authorization.split(' ')[1], tokenKey, (err, payload) => {

        if (err) next()
        else if (payload) {
          //TODO нет смысла делать постоянный запрос к БД имея токен, т.к. при проверке токена получаешь айди 
          db.User.findOne({
            where: {
              user_login: req.body.login
            }
          }).then((user) => {
            if (user.id === payload.id) {
              req.user = user
              next()
            } else {
              next()
            }
          }).catch((err) => {
            if (!req.user) next()
          });
        }
      })
    }

  },
  async authReg(login, password) {
    try {
      //console.log('Тест работает');
      const myPlaintextPassword = password;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, async function (err, hash) {
          const [user, created] = await db.User.findOrCreate({
            where: {
              user_login: login,
            },
            defaults: {
              user_password: hash
            }
          })
          // console.log(user.user_name); // 'sdepold'
          // console.log(created); // The boolean indicating whether this instance was just created
          // if (created) {
          //   console.log(user.user_password); // This will certainly be 'Technical Lead JavaScript'
          // }
        });
      });

      // if (req.body.login === user.login && req.body.password === user.password) {
      //   return res.json({
      //     id: user.id,
      //     login: user.login,
      //     token: jwt.sign({ id: user.id }, tokenKey)
      //   })
      // }

    } catch (error) {
      console.log(error)
    }
  }
}
