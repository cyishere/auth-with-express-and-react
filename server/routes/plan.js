const router = require("express").Router();
const { auth, unauthorizedError } = require("../utils/middlewares");
const { users } = require("../utils/data");

/**
 * @feature Only Debbie Ocean could make a plan
 * @route GET /api/plan
 * @access Private
 */
router.get("/", auth, (req, res, next) => {
  try {
    const userId = req.userId;

    // get this user's name
    const name = users.find((user) => user.id === userId).name;

    // check whether she's Debbie Ocean
    if (name !== "Debbie Ocean") {
      unauthorizedError("Unauthorized. Only Debbie Ocean could make a plan.");
    }

    res.json({ message: "Let's rob the Met!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
