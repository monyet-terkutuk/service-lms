const { Course } = require("../../../models");

// Get all courses data
module.exports = async (req, res) => {
  const courses = await Course.findAll();

  return res.json({
    meta: {
      message: "Get all courses successfully",
      code: 200,
      status: "success",
    },
    data: courses,
  });
};
