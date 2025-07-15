const express = require("express");
const router = express.Router();

router.get("/enfants", async (req, res) => {
  res.json([
    {
      nom: "Ali Ngom",
      classe: "5e A",
      notes: [
        { matiere: "SVT", note: 15 },
        { matiere: "Maths", note: 17 },
      ],
    },
    {
      nom: "Aïcha Ngom",
      classe: "6e B",
      notes: [
        { matiere: "Histoire", note: 13 },
        { matiere: "Français", note: 14 },
      ],
    },
  ]);
});

module.exports = router;
