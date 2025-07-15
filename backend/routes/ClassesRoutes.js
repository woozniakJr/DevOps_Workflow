// routes/classesRoutes.js
const express = require("express");
const router = express.Router();
const Classe = require("../models/Classe");

router.get("/", async (req, res) => {
  try {
    const classes = await Classe.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Ajouter une nouvelle classe
router.post("/", async (req, res) => {
  try {
    const { nomClasse, niveau } = req.body;

    if (!nomClasse || !niveau) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const nouvelleClasse = new Classe({ nomClasse, niveau });
    await nouvelleClasse.save();

    res.status(201).json({ message: "Classe ajoutée avec succès", classe: nouvelleClasse });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});


module.exports = router;
