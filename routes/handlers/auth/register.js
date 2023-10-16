const { User } = require("../../../models");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const { body } = req;

  if (
    !body.name ||
    !body.nim ||
    !body.email ||
    !body.division ||
    !body.number_phone ||
    !body.password
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

  // check email availability
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

  body.role = body.role || "student";
  const password = bcrypt.hashSync(body.password, 10);

  try {
    const user = await User.create({ ...body, password });
    return res.json({
      meta: {
        message: "Register successfully",
        code: 200,
        status: "success",
      },
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        message: error,
        code: 500,
        status: "error",
      },
      data: null,
    });
  }
};
