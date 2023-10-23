const slugify = require("slugify");
const { Course } = require("../../../models");
const getComponentFromLink = require("../helpers/getComponentFromLink");

module.exports = async (req, res) => {
  const body = req.body;

  if (!body.title || !body.link_video || !body.playlist) {
    return res.status(400).json({
      meta: {
        message: "Bad request",
        code: 400,
        status: "error",
      },
      data: "All required fields must be provided!",
    });
  }

  try {
    body.link_video = getComponentFromLink(body.link_video);
  } catch (error) {
    return res.status(400).json({
      meta: {
        message: "Bad Request",
        code: 400,
        status: "error",
      },
      data: "Invalid video link",
    });
  }

  body.slug = slugify(body.title, {
    replacement: "-",
    lower: true,
  });

  try {
    const course = await Course.create(body);
    return res.json({
      meta: {
        message: "Create course successfully",
        code: 200,
        status: "success",
      },
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        message: "Internal server error",
        code: 500,
        status: "error",
      },
      data: "Error creating course",
    });
  }
};
