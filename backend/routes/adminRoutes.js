const express = require("express");
const router = express.Router();

router.get("/stats", async (req, res) => {
  res.json({
    utilisateurs: 125,
    cours: 48,
    classes: 16,
  });
});

module.exports = router;
