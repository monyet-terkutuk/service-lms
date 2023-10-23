const { Challenge } = require("../../../models");

module.exports = async (req, res) => {
  const { id } = req.params;

  const challenge = await Challenge.findByPk(id);

  if (!challenge)
    return res.status(404).json({
      meta: {
        message: "Not found",
        code: 404,
        status: "error",
      },
      data: "Challenge not found",
    });

  await challenge.destroy();

  return res.status(200).json({
    meta: {
      message: "Challenge has been deleted",
      code: 200,
      status: "success",
    },
    data: "Sukses Cukkimai",
  });
};
