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

  // Buat entitas pengguna
  const user = await User.create(body);
  return res.json(user);
};
