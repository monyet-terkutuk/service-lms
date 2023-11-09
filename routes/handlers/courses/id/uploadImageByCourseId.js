const { Course } = require("../../../../models");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3Client = new S3Client({
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
      Bucket: process.env.AWS_S3_BUCKET_NAME, // Ganti dengan variabel lingkungan nama bucket AWS S3 kamu
      Key: `images/courses/${req.file.filename}`,
      Body: req.file.buffer,
      ACL: "public-read",
    };
    console.error();

    // Mengunggah file ke AWS S3 menggunakan AWS SDK for JavaScript versi 3
    await s3Client.send(new PutObjectCommand(params));
    console.error();

    // Update database dengan URL gambar di AWS S3
    body.image_course = `https://${process.env.AWS_S3_BUCKET_NAME}.s3-${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

    console.error();
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
    console.error(error);

    return res.status(500).json({
      meta: {
        message: "Internal server error",
        code: 500,
        status: "error",
      },
      data: "Error uploading image course",
    });
  }
};
