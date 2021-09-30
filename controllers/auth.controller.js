const User = require("../models/User.model");
const createError = require("http-errors");
const jsonwebtoken = require("jsonwebtoken");

module.exports.login = (req, res, next) => {

  const { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      next(
        createError(404, {
          error: "Email or password is incorrect",
        })
      );
    } else {
      return user.checkPassword(password).then((match) => {
        if (!match) {
          next(
            createError(404, {
              error: "Email or password is incorrect",
            })
          );
        } else {
          res.json({
            access_token: jsonwebtoken.sign(
              { id: user._id },
              process.env.JWT_SECRET || "changeme",
              {
                expiresIn: "1d",
              }
            ),
          });
        }
      });
    }
  });
};
