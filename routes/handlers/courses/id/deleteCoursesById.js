const { Course } = require("../../../../models");
const fs = require("fs");
const path = require("path");

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

  const imageFileName = course.image_course;

  await course.destroy();

  // Hapus file gambar dari direktori penyimpanan dengan Multer
  fs.unlink(
    path.join(__dirname, "../../../../public/", imageFileName),
    (err) => {
      if (err) {
        // Tangani kesalahan jika gagal menghapus gambar
        return res.status(500).json({
          meta: {
            message: "Internal server error",
            code: 500,
            status: "error",
          },
          data: "Error deleting image",
        });
      }

      // Jika penghapusan gambar berhasil
      return res.status(200).json({
        meta: {
          message: "Course has been deleted",
          code: 200,
          status: "success",
        },
        data: "Sukses Cukkimai",
      });
    }
  );
};
