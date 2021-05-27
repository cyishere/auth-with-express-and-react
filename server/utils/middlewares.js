const jwt = require("jsonwebtoken");
const { SECRET } = require("./helpers");
const { users } = require("./data");

/**
 * Request Logger
 */
const requestLogger = (req, res, next) => {
  console.info("Method:", req.method);
  console.info("Path:", req.path);
  console.info("Body:", req.body);
  console.info("---");

  next();
};

/**
 * Error Handler
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: "error",
    message: err.message,
  });

  next();
};

/**
 * Authorization
 */
// define a error helper
const unauthorizedError = (errorMsg) => {
  const error = new Error(errorMsg);
  error.statusCode = 403;
  throw error;
};

const auth = (req, res, next) => {
  try {
    // check whether there's authorization property in the request header
    const reqHeaderAuth = req.header("Authorization");
    if (!reqHeaderAuth) {
      unauthorizedError("No authorization...");
    }

    // get the token string,
    // if the format of the token is not right,
    // jsonwebtoken will throw an error
    // with "jwt malformed" message
    const token = reqHeaderAuth.split(" ")[1];

    // verify the token
    // if the token is invalid,
    // jsonwebtoken will throw an error,
    // such as an "invalid signature" message
    const decoded = jwt.verify(token, SECRET);

    // this `decoded` is an object contains one property we defined in the login method: { name }
    // check whether there's a user with this name in our database
    const user = users.find((u) => u.name === decoded.name);
    if (!user) {
      unauthorizedError("Invalid token...");
    }

    // when authorized, assign the user id to the `request`
    req.userId = user.id;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { requestLogger, errorHandler, unauthorizedError, auth };
