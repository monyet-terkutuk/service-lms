const { User } = require("../../../../models");

module.exports = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByPk(userId);
  const body = req.body;

  if (!user)
    return res.status(404).json({
      message: "User not found",
    });

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

  await user.update(req.body);

  return res.json({ user });
};
