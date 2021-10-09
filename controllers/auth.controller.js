const User = require("../models/User.model");
const createError = require("http-errors");
const jsonwebtoken = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_ID)

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


module.exports.register = (req, res, next) => {

  if (req.file) {
    req.body.avatar = req.file.path;
  }

  User.findOne({email: req.body.email})
    .then((user) => {
      if (!user) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch(next)
      } else {
        next(
          createError(404, {
            error: 'This email is already registered',
          })
        )
      }
    }).catch(next)
};

module.exports.googleRegister = async (req, res, next) => {
  const { token }  = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const { name, email, picture } = ticket.getPayload();    
    const user = await db.user.upsert({ 
        where: { email: email },
        update: { name, picture },
        create: { name, email, picture }
    })
    res.status(201)
    res.json(user)
}