const jwt = require("jsonwebtoken");

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

    console.log(data);
    next();
  } catch (error) {
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
