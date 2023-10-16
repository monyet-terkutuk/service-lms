const { User } = require("../../../../models");

module.exports = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByPk(userId);

  if (!user)
    return res.status(404).json({
      meta: {
        message: "User not found",
        code: 404,
        status: "error",
      },
      data: null,
    });

  await user.destroy();

  return res.status(200).json({
    meta: {
      message: "User has been deleted",
      code: 200,
      status: "success",
    },
    data: null,
  });
};
