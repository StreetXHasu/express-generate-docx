const jwt = require("jsonwebtoken");
const db = require("../models");
const tokenKey = "1a2b-3c4d-5e6f-7g8h";
const bcrypt = require("bcrypt");
const moment = require("moment");
const saltRounds = 10;

module.exports = {
  async authLogin(req, res, next) {
    try {
      //console.log('Тест работает');
      const userlogin = req.body.userlogin;
      const userpassword = req.body.userpassword;

      const myPlaintextPassword = userpassword;

      let user = await db.User.findOne({
        where: {
          user_login: userlogin,
        },
      });
      if (!user) {
        return res.status(200).json({
          message: "User not found",
        });
      }
      let check = await bcrypt.compare(myPlaintextPassword, user.user_password);
      if (check) {
        let token = jwt.sign(
          {
            id: user.id,
            endSession: `${moment()
              .add(30, "d")
              .format("YYYY-MM-DD HH:mm:ss.SSS Z")}`,
          },
          tokenKey
        );

        // console.log(user.user_name); // 'sdepold'
        // console.log(created); // The boolean indicating whether this instance was just created
        // if (created) {
        //   console.log(user.user_password); // This will certainly be 'Technical Lead JavaScript'
        // }

        return res.status(200).json({
          id: user.id,
          login: user.user_login,
          token: token,
        });
      }

      // if (req.body.login === user.login && req.body.password === user.password) {
      //   return res.json({
      //     id: user.id,
      //     login: user.login,
      //     token: jwt.sign({ id: user.id }, tokenKey)
      //   })
      // }
    } catch (error) {
      console.log(error);
    }
    return res.status(200).json({
      message: "User not found",
    });
  },

  async authVerify(req, res, next) {
    try {
      //TODO сделать эту проверку
      //   const token = authHeader && authHeader.split(" ")[1];

      if (req.headers.authorization) {
        const payload = await jwt.verify(
          req.headers.authorization.slice(7),
          tokenKey
        );
        if (payload) {
          //TODO нет смысла делать постоянный запрос к БД имея токен, т.к. при проверке токена получаешь айди
          const user = await db.User.findOne({
            where: {
              id: payload.id,
            },
          });
          if (user) {
            req.user = user;
            return next();
          }
        }
      } else {
        return next();
      }
    } catch (error) {
      // res.status(401).send()
      return next(error);
    }

    //  if (!req.user) next()
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
              user_password: hash,
            },
          });
          return true;
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
      console.log(error);
      return false;
    }
  },
};
