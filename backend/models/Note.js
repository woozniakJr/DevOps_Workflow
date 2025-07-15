// models/Note.js
const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  eleve: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  evaluation: { type: mongoose.Schema.Types.ObjectId, ref: "Evaluation", required: true },
  note: {
    type: Number,
    required: true,
    min: 0,
    max: 20,
  },
  appreciation: { type: String }, // Facultatif : "Bien", "Passable", etc.
}, { timestamps: true });

module.exports = mongoose.model("Note", NoteSchema);
