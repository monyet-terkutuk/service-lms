const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      meta: {
        message: "Token is missing",
        code: 403,
        status: "error",
      },
      data: null,
    });
  }

  try {
    const tokenJWT = token.split(" ").pop();
    const data = jwt.verify(tokenJWT, "confidentialdata");

    if (!data) {
      return res.status(403).json({
        meta: {
          message: "Invalid token",
          code: 403,
          status: "error",
        },
        data: null,
      });
    }

    const user = await User.findByPk(data.data.id);

    if (!user)
      return res.status(404).json({
        meta: {
          message: "User not found",
          code: 404,
          status: "error",
        },
        data: null,
      });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      meta: {
        message: "Token verification failed",
        code: 403,
        status: "error",
      },
      data: null,
    });
  }
};
