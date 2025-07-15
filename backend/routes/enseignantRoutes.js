const express = require("express");
const router = express.Router();

router.get("/classes", async (req, res) => {
  res.json([
    { nomClasse: "3e A", niveau: "Troisième" },
    { nomClasse: "4e B", niveau: "Quatrième" },
  ]);
});

router.get("/evaluations", async (req, res) => {
  res.json([
    { titre: "Interro de Maths", date: "2025-07-01" },
    { titre: "Test de Français", date: "2025-07-10" },
  ]);
});

module.exports = router;
