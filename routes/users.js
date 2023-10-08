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
  return res.json({
    id: 1,
    name: "Gabriel Yonathan",
    role: "admin",
  });
});

module.exports = router;
