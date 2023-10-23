const { Course } = require("../../../../models");
const getComponentFromLink = require("../../helpers/getComponentFromLink");
const slugify = require("slugify");

module.exports = async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findByPk(courseId);
  const body = req.body;

  if (!course)
    return res.status(404).json({
      meta: {
        message: "Not found",
        code: 404,
        status: "error",
      },
      data: "Course not found",
    });

  if (!body.title || !body.link_video || !body.playlist) {
    return res.status(400).json({
      meta: {
        message: "All required fields must be provided!",
        code: 400,
        status: "error",
      },
      data: null,
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
      data: error.message,
    });
  }

  body.slug = slugify(body.title, {
    replacement: "-",
    lower: true,
  });

  await course.update(req.body);

  return res.json({
    meta: {
      message: "Edit course by ID successfully",
      code: 200,
      status: "success",
    },
    data: course,
  });
};
