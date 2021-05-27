const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { users } = require("../utils/data");
const SECRET = "thisSupposeToBeSecrectNotForPublic";

/**
 * @feature Login
 * @route POST /api/user
 * @access Public
 */
router.post("/", async (req, res, next) => {
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
    if (password !== user.password) {
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

// profile: choose the right task, you'll see your profile

module.exports = router;
