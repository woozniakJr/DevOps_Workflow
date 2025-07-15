// routes/noteRoutes.js
const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

router.post("/", async (req, res) => {
  const { evaluationId, notes } = req.body;

  try {
    const savedNotes = await Promise.all(
      notes.map(async ({ eleveId, note }) => {
        return await Note.create({
          eleve: eleveId,
          evaluation: evaluationId,
          note,
        });
      })
    );

    res.status(201).json({ message: "Notes enregistrées", savedNotes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// routes/noteRoutes.js (ajout à la même route que plus haut)
router.get("/", async (req, res) => {
  const { eleveId } = req.query;

  try {
    const notes = await Note.find({ eleve: eleveId })
      .populate("evaluation", "titre matiere date")
      .populate("eleve", "nom prenom");

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
