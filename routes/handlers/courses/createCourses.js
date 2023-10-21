const { Course } = require("../../../models");
const path = require("path");
const crypto = require("crypto"); // Untuk menghasilkan MD5 hash
const fs = require("fs"); // Modul sistem berkas

// Menangani unggahan gambar
const handleImageUpload = (image) => {
  const ext = path.extname(image.name).toLowerCase();
  const allowedTypes = [".png", ".jpg", ".jpeg"];
  if (!allowedTypes.includes(ext)) {
    return {
      error: "Invalid file type. Allowed types: .png, .jpg, .jpeg",
    };
  }

  if (image.size > 5000000) {
    return {
      error: "File size must be less than 5MB",
    };
  }

  // Menghasilkan nama unik untuk gambar
  const imageName =
    crypto.createHash("md5").update(image.data).digest("hex") + ext;

  // Menyimpan gambar
  const imagePath = `./public/images/courses/${imageName}`;
  fs.writeFileSync(imagePath, image.data);

  return {
    success: true,
    imagePath,
  };
};

module.exports = async (req, res) => {
  const {
    title,
    user_id,
    materi,
    link_video,
    division,
    playlist,
    slug,
    category,
  } = req.body;

  if (!req.files || !req.files.image_course) {
    return res.status(400).json({
      meta: {
        message: "Bad Request",
        code: 400,
        status: "error",
      },
      data: "Images must be provided",
    });
  }

  const image = req.files.image_course;
  const imageUploadResult = handleImageUpload(image);

  if (imageUploadResult.error) {
    return res.status(422).json({
      meta: {
        message: "Unprocessable Entity",
        code: 422,
        status: "error",
      },
      data: imageUploadResult.error,
    });
  }

  const imageURL = `${req.protocol}://${req.get("host")}/images/courses/${
    imageUploadResult.imagePath
  }`;

  try {
    const course = await Course.create({
      user_id,
      title,
      materi,
      link_video,
      division,
      playlist,
      slug,
      category,
      image_course: imageURL,
    });

    return res.status(201).json({
      meta: {
        message: "Course created successfully",
        code: 201,
        status: "success",
      },
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        message: "Internal Server Error",
        code: 500,
        status: "error",
      },
      data: error.message,
    });
  }
};
