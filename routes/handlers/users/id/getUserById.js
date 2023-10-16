const { User } = require("../../../../models");

module.exports = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password"] },
  });

  if (!user)
    return res.status(404).json({
      meta: {
        message: "User not found",
        code: 404,
        status: "error",
      },
      data: null,
    });

  return res.json({
    meta: {
      message: "Get user by ID successfully",
      code: 200,
      status: "success",
    },
    data: user,
  });
};
