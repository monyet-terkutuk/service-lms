const slugify = require("slugify");
const { Challenge } = require("../../../models");

module.exports = async (req, res) => {
  const body = req.body;

  if (!body.title || !body.link) {
    return res.status(400).json({
      meta: {
        message: "Bad request",
        code: 400,
        status: "error",
      },
      data: "Title and Link must be provided!",
    });
  }

  try {
    const challenge = await Challenge.create(body);
    return res.json({
      meta: {
        message: "Create challenge successfully",
        code: 200,
        status: "success",
      },
      data: challenge,
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        message: "Internal server error",
        code: 500,
        status: "error",
      },
      data: "Error creating challenge",
    });
  }
};
