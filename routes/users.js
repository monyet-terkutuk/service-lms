const express = require("express");
const { User } = require("../models");
const router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
  return res.json({
    id: 1,
    name: "Gabriel Yonathan",
    role: "admin",
  });
});

/* POST create user. */
router.post("/", async (req, res) => {
  const body = req.body;

  // Pastikan semua field wajib ada
  if (
    !body.name ||
    !body.nim ||
    !body.email ||
    !body.division ||
    !body.number_phone
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided!" });
  }

  // Buat entitas pengguna
  const user = await User.create(body);
  return res.json(user);
});

/* PUT update user. */
router.put("/", (req, res) => {
  return res.json(req.body);
});

/* DELETE deleting user. */
router.delete("/", (req, res) => {
  return res.json(req.body);
});
module.exports = router;
