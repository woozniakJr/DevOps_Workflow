const express = require("express");
const router = express.Router();
const Evaluation = require("../models/Evaluation");

router.get("/", async (req, res) => {
  const { classeId } = req.query;

  try {
    const evaluations = await Evaluation.find(classeId ? { classe: classeId } : {})
      .populate("enseignant", "nom prenom")
      .populate("classe", "nomClasse niveau");

    res.json(evaluations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.post("/", async (req, res) => {
  const { titre, date, classe, enseignant, matiere } = req.body;

  try {
    const nouvelleEvaluation = new Evaluation({
      titre,
      date,
      classe: mongoose.Types.ObjectId(classe),
      enseignant: mongoose.Types.ObjectId(enseignant),
      matiere
    });

    const evaluation = await nouvelleEvaluation.save();
    res.status(201).json({ message: "Évaluation créée", evaluation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la création de l’évaluation." });
  }
});

module.exports = router;
