const mongoose = require("mongoose");

const coursSchema = new mongoose.Schema(
  {
    titre: { type: String, required: true }, // ex: "Mathématiques"
    professeur: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    classe: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Classe", 
      required: true 
    },
    description: { type: String }, // optionnel : contenu ou résumé du cours
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cours", coursSchema);
