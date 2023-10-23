const { Course } = require("../../../../models");

module.exports = async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findByPk(courseId);

  if (!course)
    return res.status(404).json({
      meta: {
        message: "Not found",
        code: 404,
        status: "error",
      },
      data: "Course not found",
    });

  return res.json({
    meta: {
      message: "Get course by ID successfully",
      code: 200,
      status: "success",
    },
    data: course,
  });
};
