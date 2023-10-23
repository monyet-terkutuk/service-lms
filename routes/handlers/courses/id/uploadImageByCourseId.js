const { Course } = require("../../../../models");

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

  body.image_course = `images/courses/${req.file.filename}`;

  try {
    await course.update({ ...body });

    return res.json({
      meta: {
        message: "Upload image course successfully",
        code: 200,
        status: "success",
      },
      data: course.image_course,
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        message: "Internal server error",
        code: 500,
        status: "error",
      },
      data: "Error uploade image course",
    });
  }
};
