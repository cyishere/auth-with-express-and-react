const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { users } = require("../utils/data");
const { SECRET } = require("../utils/helpers");
const { auth, unauthorizedError } = require("../utils/middlewares");

/**
 * @feature Login
 * @route POST /api/user
 * @access Public
 */
router.post("/", (req, res, next) => {
  try {
    const { name, password } = req.body;
    if (name.trim() === "" || password.trim() === "") {
      const error = new Error("Name and password must not be empty.");
      error.statusCode = 400;
      throw error;
    }

    // check is there's a user in the database
    const user = users.find((u) => u.name === name);
    if (!user) {
      const error = new Error("No such user.");
      error.statusCode = 400;
      throw error;
    }

    // check whether the password is correct
    if (password.trim() !== user.password) {
      const error = new Error("Incorrect password...");
      error.statusCode = 400;
      throw error;
    }

    // if authenticated, generate a token
    const token = jwt.sign({ name }, SECRET);

    // return the token and user id
    res.json({
      userId: user.id,
      token,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @feature Get user's profile
 * @route GET /api/user/:id
 * @access Private
 */
// 🔴 NOTE: put the `auth` middleware here (router argument) to use it
router.get("/:id", auth, (req, res, next) => {
  try {
    // in the data.json, the user ids are number,
    // so convert string to number first
    const userId = Number(req.params.id);

    // we already check the user's identity in the auth middleware
    // now we need to check if the user can see this profile
    if (userId !== req.userId) {
      unauthorizedError("Unauthorized! You cannot see other's profile.");
    }

    // find the user by id in the database
    const user = users.find((u) => u.id === userId);
    delete user.password;

    // return the user info
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

/**
 * @feature Get all users' info
 * @route GET /api/user
 * @access Private
 */
router.get("/", auth, (req, res, next) => {
  try {
    // all user could see all the team members
    users.forEach((user) => {
      delete user.password;
      return user;
    });

    res.json({ users });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
