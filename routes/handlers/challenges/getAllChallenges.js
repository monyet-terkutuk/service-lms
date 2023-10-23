const { Challenge } = require("../../../models");

module.exports = async (req, res) => {
  const challenge = await Challenge.findAll();

  return res.json({
    meta: {
      message: "Get all challenges successfully",
      code: 200,
      status: "success",
    },
    data: challenge,
  });
};
