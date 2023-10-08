var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
  return res.json({
    id: 1,
    name: "Gabriel Yonathan",
    role: "admin",
  });
});

/* POST create user. */
router.post("/", (req, res) => {
  return res.json(req.body);
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
