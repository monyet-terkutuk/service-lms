const { User } = require("../../../../models");

module.exports = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password"] },
  });
  const body = req.body;

  if (!user)
    return res.status(404).json({
      meta: {
        message: "User not found",
        code: 404,
        status: "error",
      },
      data: null,
    });

  if (
    !body.name ||
    !body.nim ||
    !body.email ||
    !body.division ||
    !body.number_phone
  ) {
    return res.status(400).json({
      meta: {
        message: "All required fields must be provided!",
        code: 400,
        status: "error",
      },
      data: null,
    });
  }

  const isEmailUsed = await User.findOne({
    where: { email: body.email },
  });

  if (isEmailUsed) {
    return res.status(400).json({
      meta: {
        message: "Email has been used",
        code: 400,
        status: "error",
      },
      data: null,
    });
  }

  await user.update(req.body);

  return res.json({
    meta: {
      message: "Edit user by ID successfully",
      code: 200,
      status: "success",
    },
    data: user,
  });
};
