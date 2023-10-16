const { User } = require("../../../models");

// create a user data
module.exports = async (req, res) => {
  const body = req.body;

  // Pastikan semua field wajib ada
  if (
    !body.name ||
    !body.nim ||
    !body.email ||
    !body.division ||
    !body.number_phone
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided!" });
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

  // Set nilai default role jika tidak disediakan
  body.role = body.role || "student";

  // Set nilai default password jika tidak disediakan
  body.password = body.password || body.nim;

  // Buat entitas pengguna
  try {
    const user = await User.create(body);
    return res.json({
      meta: {
        message: "Create user successfully",
        code: 200,
        status: "success",
      },
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        message: "Error creating user",
        code: 500,
        status: "error",
      },
      data: null,
    });
  }
};
