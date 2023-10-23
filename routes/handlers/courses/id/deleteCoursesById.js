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

  await course.destroy();

  return res.status(200).json({
    meta: {
      message: "Course has been deleted",
      code: 200,
      status: "success",
    },
    data: "Sukses Cukkimai",
  });
};
