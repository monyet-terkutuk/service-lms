const { Course } = require("../../../../models");
const fs = require("@cyclic.sh/s3fs/promises");
require("dotenv").config();

const s3fs = fs("cyclic-magenta-tortoise-yoke-us-west-1", {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

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

  try {
    const params = {
      Bucket: "cyclic-magenta-tortoise-yoke-us-west-1",
      Key: `images/courses/${req.file.filename}`,
      Body: req.file.buffer,
      ACL: "public-read",
    };

    // Upload file to AWS S3 using @cyclic.sh/s3fs/promises
    await s3fs.writeFile(params.Key, params.Body, { ACL: params.ACL });

    // Update database with the URL of the image in AWS S3
    body.image_course = `https://${"cyclic-magenta-tortoise-yoke-us-west-1"}.s3-${
      process.env.AWS_REGION
    }.amazonaws.com/${params.Key}`;

    await course.update({ ...body });

    return res.json({
      meta: {
        message: "Upload image course successfully",
        code: 200,
        status: "success",
      },
      data: body.image_course,
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        message: "Internal server error",
        code: 500,
        status: "error",
        error: error,
      },
      data: "Error uploading image course",
    });
  }
};
