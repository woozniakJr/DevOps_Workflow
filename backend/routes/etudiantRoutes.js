const express = require("express");
const router = express.Router();

// 🔐 Middleware d'authentification si disponible
// const { verifyToken } = require("../middleware/auth");

router.get("/cours", async (req, res) => {
  res.json([
    { titre: "Mathématiques", professeur: "Mme Ndiaye" },
    { titre: "Physique-Chimie", professeur: "M. Diop" },
    { titre: "Français", professeur: "Mme Ba" },
    { titre: "SVT", professeur: "M. Sarr" },
    { titre: "Anglais", professeur: "Mme Wade" },
    { titre: "Histoire-Géo", professeur: "M. Fall" },
  ]);
});

router.get("/notes", async (req, res) => {
  res.json([
    { matiere: "Mathématiques", note: 14 },
    { matiere: "Physique-Chimie", note: 12 },
    { matiere: "Français", note: 16 },
    { matiere: "SVT", note: 9 },
    { matiere: "Anglais", note: 17 },
    { matiere: "Histoire-Géo", note: 11 },
  ]);
});


router.get("/presence", async (req, res) => {
  res.json({
    present: 42,
    absent: 3
  });
});

module.exports = router;
