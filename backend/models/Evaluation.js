// models/Evaluation.js
const mongoose = require("mongoose");

const EvaluationSchema = new mongoose.Schema({
  titre: { type: String, required: true },               // Exemple : "Interro de Maths"
  date: { type: Date, required: true },
  matiere: { type: String, required: true },             // Exemple : "Mathématiques"
  enseignant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  classe: { type: mongoose.Schema.Types.ObjectId, ref: "Classe", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Evaluation", EvaluationSchema);
