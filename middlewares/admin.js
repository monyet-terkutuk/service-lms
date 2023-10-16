module.exports = async (req, res, next) => {
  const { user } = req;

  if (!user || user.role !== "admin") {
    return res.status(403).json({
      meta: {
        message: "You are not authorized to access this data.",
        code: 403,
        status: "error",
      },
      data: "Forbidden",
    });
  }

  next();
};
