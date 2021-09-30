const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports.isAuthenticated = (req, res, next) => {
  const authorization = req.header("Authorization");

  if (authorization) {
    const [type, token] = authorization.split(" ");
    if (type === "Bearer") {
      jwt.verify(
        token,
        process.env.JWT_SECRET || "changeme",
        (error, decodedJwt) => {
          if (error) {
            throw createError(401);
          }
          if (decodedJwt) {
            req.currentUser = decodedJwt.id;
            next()
            return
          }
        }
      );
    }  else {
			throw createError(401);
		}
  }  else {
    throw createError(401);
  }
};

module.exports.isNotAuthenticated = (req, res, next) => {};
